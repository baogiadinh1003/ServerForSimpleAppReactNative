const express = require('express');
const mongoose= require('mongoose');
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const rounter = express.Router();
const {jwtkey} = require('../keys')

rounter.post('/signup', async (req, res)=>{
    const {email, password, phoneNumber} = req.body;
    try{
        const user = new UserModel({email, password, phoneNumber});
        await user.save()
        const token = jwt.sign({userId:user._id}, jwtkey)
        res.send({token})
    } catch(err){
        return res.status(500).send(err.message)
    }
    
})

rounter.post('/signin', async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).send({error: "must provide email or password"})
    }
    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(400).send({error: "must provide email or password"})
    }
    try{
        const token = jwt.sign({userId:user._id}, jwtkey)
        res.send(user)
    } catch(err){
        return res.status(400).send({error: "must provide email or password"})
    }
})

rounter.get('/getUser/:id', async(req,res)=>{
    const user = await UserModel.findById(req.params.id)
    try {
        res.send(user)
    } catch(err){
        res.status(500).send(err)
    }
})

module.exports = rounter;