const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// const staticPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/partials"))


// app.use(express.static(staticPath)); // built in middleware

app.get('/', (req, res) => {
    res.render("index", {
        name: "Om",
    });
});

app.get('/about', (req, res) => {
   // res.send("This is about page");
        res.render('about')
});

app.get('/contactus', (req, res) => {
    res.send("This is contact us page");
});

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(5000);