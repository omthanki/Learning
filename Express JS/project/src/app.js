require('dotenv').config()
const { urlencoded } = require('express')
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(urlencoded({extended: false}))
app.use(cookieParser())

const port = process.env.port || 8000;

require("./db/conn")

app.set("view engine", "hbs")
hbs.registerPartials(path.join(__dirname, "../partials"))

const userrouter = require('./router/routes')

app.use(userrouter)

app.listen(port)