const express = require('express')
const hbs = require('hbs')
const path = require("path");
const port = process.env.PORT || 8000;

require('./db/conn')
const userrouter = require('./router/user')
const app = express()

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "../partials/"))

app.use(express.json());
app.use(userrouter)

app.listen(port)