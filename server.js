// const express = require('express')
import express from 'express'
import authRouter from './routes/auth'

const app = express()

app.use('/api/v1', authRouter)

const port = 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/v1`)
})
