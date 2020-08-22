import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'

const app = express()
const port = 5000

//middleware
app.use(json())
app.use(cors())

//initialize database
import db from './models/db'
db.init()

//setup passport
import passportSetup from './config/passport-setup'
app.use(passportSetup.initialize())
app.use(passportSetup.session())

import users from './routes/api/users'
app.use('/api/users', users)

app.listen(port, () => 
    console.log(`server listening on port ${port}...`))