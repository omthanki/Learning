const express = require('express');
const router = new express.Router();
const User = require('../db/coll')

router.get("/", (req, res) => {
    res.render('index')
})

router.post("/user", async (req, res) => {

    try {
        const userdata = new User(req.body)
        const created = await userdata.save()
        res.status(201).send(created)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/user", async (req, res) => {

    try{
        const readdata = await User.find()
        res.send(readdata)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get("/user/:id", async (req, res) => {

    try{
        const id = req.params.id
        const readdata = await User.findById({_id:id})

        if(!readdata)
            return res.status(404).send()
        
        res.send(readdata)

    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/user/:id', async (req, res) => {
    
    try {
        const id = req.params.id
        const updatedata = await User.findByIdAndUpdate(id, req.body)
        res.send(updatedata)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/user/:id', async (req, res) => {

    try {
        const id = req.params.id
        const deletedata = await User.deleteOne({_id:id})
        res.send(deletedata)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('*', (req, res) => {
    res.render('404')
})

module.exports = router;