require('dotenv').config()
import express from 'express'

import {readdirSync} from 'fs'

const app = express()

readdirSync('./routes').map((r) => app.use('/api/v1', require(`./routes/${r}`)))

const port = process.env.PORT || '5000'
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/v1`)
})
