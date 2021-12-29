require('dotenv').config()
import express from 'express'
import cors from 'cors'
import {readdirSync} from 'fs'
const morgan = require('morgan')
import mongoose from 'mongoose'

const app = express()

// connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Server error connecting to MongoDB:', error)
  })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(morgan('combined'))

readdirSync('./routes').map((r) => app.use('/api/v1', require(`./routes/${r}`)))

const port = process.env.PORT || '5000'
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/v1`)
})
