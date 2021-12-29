// const express = require('express')
import express from 'express'
import authRouter from './routes/auth'
import {readdirSync} from 'fs'

const app = express()

readdirSync('./routes').map((r) => app.use('/api/v1', require(`./routes/${r}`)))
// app.use('/api/v1', authRouter)

const port = 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/v1`)
})
