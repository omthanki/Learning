const express = require('express');
const router = new express.Router();
const User = require('../db/coll')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../auth/auth')

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.post("/register", async (req, res) => {

    try {

        const password = req.body.pass
        const cpassword = req.body.cpass

        if (password != cpassword) {
            res.send("Passwords doesn't match")
        }
        else {

            const hpass = await bcrypt.hash(password, 10)

            if (hpass) {

                const registeruser = new User({
                    name: req.body.username,
                    email: req.body.email,
                    mobile: req.body.phone,
                    password: hpass
                })

                const token = await registeruser.generateAuthToken();

                res.cookie("jwtcookie", token, {
                    expires: new Date(Date.now() + 600000),
                    httpOnly: true
                })

                const registered = await registeruser.save()
                res.status(201).render("index")
            }
        }

    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

router.get("/login", (req, res) => {
    res.render("login")
})

// router.route("/login").post((req,res)=>{})

router.post("/login", async (req, res) => {

    try {

        const email = req.body.email
        const password = req.body.pass

        const data = await User.findOne({ email })

        validatepassword = await bcrypt.compare(password, data.password)

        const token = await data.generateAuthToken();        

        res.cookie("jwtcookie", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true
        })
        
        if (validatepassword)
            res.status(200).render("index")

        else
            res.status(400).send("Login failed")

    } catch (error) {
        res.status(400).send("Login failed")
    }

})

router.get('/secret', auth, (req, res) => {
    res.render('secret')
})

router.get('/logout', auth, async (req, res) => {

    try {

        req.user.tokens = req.user.tokens.filter((curElement) => {
            return curElement !== req.token
        })

        // Logout from all devices
        // req.user.token = []
     
        res.clearCookie("jwtcookie")

        await req.user.save()
        res.render("login")

    } catch (error) {
        res.status(500).send(error)
    }

})

router.get('*', (req, res) => {
    res.render('404')
})

module.exports = router;