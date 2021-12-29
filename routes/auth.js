const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({message: 'welcome to home page'})
})

module.exports = router
