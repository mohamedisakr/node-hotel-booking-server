const express = require('express')
const {showMessage} = require('../controllers/auth')

const router = express.Router()

router.get('/', showMessage)

module.exports = router
