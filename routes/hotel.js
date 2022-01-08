const express = require('express')
const {
  create,
  getAll,
  getSellerHotels,
  remove,
} = require('../controllers/hotel')
const {requireSignin, hotelOwner} = require('../middlewares')

const router = express.Router()

router.post('/create-hotel', requireSignin, create)
router.get('/hotels', getAll)
router.get('/seller', requireSignin, getSellerHotels)
router.delete('/delete-hotel/:hotelId', requireSignin, hotelOwner, remove)

module.exports = router
