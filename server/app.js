require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3000

let app = express()

mongoose.connect(process.env.MONGOD_DB, {useNewUrlParser: true})
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/', routes)

app.listen(port, ()=>{
    console.log(`Listen on ${port}`);
})