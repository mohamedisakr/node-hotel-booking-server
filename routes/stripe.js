const express = require('express')
const {createConnectAccount} = require('../controllers/stripe')
const {requireSignin} = require('../middlewares')

const router = express.Router()

router.post('/create-connect-account', requireSignin, createConnectAccount)

module.exports = router
