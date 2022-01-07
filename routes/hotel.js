const express = require('express')
const {create, getAll} = require('../controllers/hotel')
const {requireSignin} = require('../middlewares')

const router = express.Router()

router.post('/create-hotel', requireSignin, create)
router.get('/hotels', getAll)

module.exports = router
