const express = require('express')
const {create, getAll, getSellerHotels} = require('../controllers/hotel')
const {requireSignin} = require('../middlewares')

const router = express.Router()

router.post('/create-hotel', requireSignin, create)
router.get('/hotels', getAll)
// router.get('/seller-hotels', requireSignin, getSellerHotels)
router.get('/seller', requireSignin, getSellerHotels)

module.exports = router
