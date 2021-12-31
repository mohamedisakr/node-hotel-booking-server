const jwt = require('jsonwebtoken')
const User = require('../models/user')
const secret = process.env.JWT_SECRET

export const register = async (req, res, next) => {
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

export const login = async (req, res, next) => {
  console.log(req.body)
  const {email, password} = req.body

  try {
    // check if user's email already exist
    const user = await User.findOne({email}).exec()
    if (!user) {
      // return res.status(404).json({message: `User not found`})
      return res.status(400).json({message: `User not found`})
    }

    // compare password
    user.comparePassword(password, (err, match) => {
      console.log(`Compare password error : ${err}`)
      if (!match || err) {
        return res.status(400).json({message: `Invalid credentials`})
      }

      // exclude password from user object
      const safeUser = {
        _id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }

      // Generating token & send to client
      const token = jwt.sign({_id: user._id}, secret, {expiresIn: '60d'})
      return res.status(200).json({token, safeUser})
    })
  } catch (err) {
    console.log(`Login error: ${err}`)
    return res.status(400).json({message: 'Login failed'})
  }
}
// module.exports = {register}
