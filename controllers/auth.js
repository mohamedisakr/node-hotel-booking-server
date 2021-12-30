const User = require('../models/user')

const register = async (req, res, next) => {
  console.log(req.body)
  const {name, email, password} = req.body

  // validation
  if (!name) {
    return res.status(400).json({message: 'Name is required'})
  }

  if (!password) {
    return res.status(400).json({message: 'Password is required'})
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({message: 'Password must be at least 6 characters'})
  }

  // check for existing email
  const userExist = await User.findOne({email}).exec()
  if (userExist) {
    return res.status(400).json({message: `${email} is already exist`})
  }

  const newUser = new User({name, email, password})

  try {
    await newUser.save()
    console.log(`User created ${newUser}`)
    return res.status(201).json({data: newUser, message: `User created`})
  } catch (error) {
    console.error(`User creation failed ${error}`)
    return res.status(400).json({message: `User creation failed`})
  }
}

module.exports = {register}
