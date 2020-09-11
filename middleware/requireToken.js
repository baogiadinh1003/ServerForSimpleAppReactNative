const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const UserModel = require('../models/UserModel')
const {jwtkey} = require('../keys')
const User = require('../models/UserModel')

module.exports = (req, res, next)=>{
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(404).send({error:"You must be logged in"})
    }
     const token = authorization.replace("Bearer ","")
     jwt.verify(token, jwtkey, async(err, payload)=>{
         if(err){
            return res.status(404).send({error:"You must be logged in"})
         }
         const {userId} = payload;
         const user = await User.findById(userId)
         req.user = user;
         next()
     })
}