const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique:true,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    name:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    facebookAddress:{
        type:String
    },
})

userSchema.pre('save', function(){
    const user = this;
    if (user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, (err, salt)=>{
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash)=>{
            if (err){
                return next(err)
            }
            user.password = hash;
            next()
        })
    })

})

userSchema.methods.comparePassword = function(candidatePassword){
    const user = this;
    return new Promise((resolve, reject)=>{
        bcrypt.compare(candidatePassword, user.password, (err, isMatch)=>{
            if(err){
                return reject(err)
            }
            if(!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })
}

const User = mongoose.model('User',userSchema, 'User');
module.exports = User;
