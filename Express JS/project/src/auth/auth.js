const User = require('../db/coll')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    try {
        
        const token = req.cookies.jwtcookie;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)

        console.log(verifyUser)

        const data = await User.findOne({_id:verifyUser._id})

        req.token = token
        req.user = data

        next()

    } catch (error) {
        console.log("Error: " + error)
        res.status(401).send(error)
    }

}

module.exports = auth