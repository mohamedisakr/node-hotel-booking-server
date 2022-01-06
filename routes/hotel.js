const express = require('express')
const {create} = require('../controllers/hotel')
const {requireSignin} = require('../middlewares')

const router = express.Router()

router.post('/create-hotel', requireSignin, create)

module.exports = router
