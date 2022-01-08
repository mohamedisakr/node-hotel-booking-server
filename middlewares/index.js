const expressJwt = require('express-jwt')
const Hotel = require('../models/hotel')
const secret = process.env.JWT_SECRET

const options = {secret, algorithms: ['HS256']}

// req.user
const requireSignin = expressJwt(options)

const hotelOwner = async (req, res, next) => {
  const hotelId = req.params.hotelId
  const hotel = await Hotel.findById(hotelId).exec()
  //   console.log(`hotel to delete ${hotel}`);
  const owner = hotel.postedBy._id.toString() === req.user._id.toString()

  if (!owner) {
    return res
      .status(403)
      .send('Unauthorized. You are not authorized for this operation')
  }

  next()
}

module.exports = {requireSignin, hotelOwner}
