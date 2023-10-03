const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./db/connectDB')
const bodyParser = require('body-parser')
const path = require('path')
const API = require('./routes/api')
const cookieParser = require('cookie-parser')
const cors = require('cors')



app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config({
    path: '.env'
})

app.use(cookieParser())

app.use(express.json())

app.use(express.static(path.join(__dirname, 'uploads')))

app.use('/api/blog/',API)

connectDB()




app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at localhost: ${process.env.PORT}`);
})