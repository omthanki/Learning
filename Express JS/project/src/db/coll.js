const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    mobile: Number,
    password: String,
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function(){
    
    try {

        const token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)

        this.tokens=this.tokens.concat({token})
        await this.save()

        return token
        
    } catch (error) {
        console.log("Error: " + error)
        res.send(error)
    }
}

const UserModel = new mongoose.model('User', userSchema)

module.exports = UserModel