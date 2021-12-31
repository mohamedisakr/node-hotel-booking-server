const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
    },
    email: {
      type: String,
      trim: true,
      required: 'Email is required',
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {},
  },
  {timestamps: true},
)

userSchema.pre('save', function (next) {
  let user = this
  if (user.isModified('password')) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log(`Bcrypt Hash Error ${err}`)
        return next()
      }
      user.password = hash
      return next()
    })
  } else {
    return next()
  }
})

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log(`Compare password error: ${error}`)
      return next(err, false)
    }
    console.log(`Password match: ${match}`)
    return next(null, match)
  })
}

const User = model('user', userSchema)
module.exports = User
