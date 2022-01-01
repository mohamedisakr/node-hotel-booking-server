const expressJwt = require('express-jwt')
const secret = process.env.JWT_SECRET

const options = {secret, algorithms: ['HS256']}

// req.user
const requireSignin = expressJwt(options)

module.exports = {requireSignin}
