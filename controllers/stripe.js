const stripeSecret = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecret)
// const Stripe = require('stripe')

const queryString = require('query-string')
const User = require('../models/user')

// console.log(`stripe secret : ${stripeSecret}`)

// const stripe = new Stripe(stripeSecret)
// const stripe = Stripe(stripeSecret)
const stripeRedirectUrl = process.env.STRIPE_REDIRECT_URL

const createConnectAccount = async (req, res, next) => {
  // 1. find user
  const user = await User.findById(req.user._id)

  // 2. if user does not have stripe_account_id, create now
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({type: 'express'})
    console.log(`acount id : ${account.id}`)
    user.stripe_account_id = account.id
    await user.save()
  }

  // 3. create login link based on account id (for frontend complete onboarding)
  const accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: stripeRedirectUrl,
    return_url: stripeRedirectUrl,
    type: 'account_onboarding',
  })

  // pre-fill any info (such as email)
  accountLink = Object.assign({
    'stripe_user[email]': user.email || undefined,
  })

  console.log(`account link ${accountLink}`)

  // 4. update payment schedule
}

module.exports = {createConnectAccount}
