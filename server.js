const express = require('express')

const app = express()

app.get('/', (req, res, next) => {
  res.status(200).json({message: 'welcome to home page'})
})

const port = 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
