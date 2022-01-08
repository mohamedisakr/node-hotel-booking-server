const express = require('express')
const {
  create,
  getAll,
  getSellerHotels,
  remove,
  read,
} = require('../controllers/hotel')
const {requireSignin, hotelOwner} = require('../middlewares')

const router = express.Router()

router.post('/create-hotel', requireSignin, create)
router.get('/hotels', getAll)
router.get('/seller', requireSignin, getSellerHotels)
router.delete('/delete-hotel/:hotelId', requireSignin, hotelOwner, remove)
router.get('/hotel/:hotelId', read)

module.exports = router
