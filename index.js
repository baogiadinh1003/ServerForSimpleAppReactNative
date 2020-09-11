const express = require('express')
const app = express()
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const {mongoUrl} = require('./keys')
const PORT = 1212
const UserRouter = require('./routers/userRounter')
const requireToken = require('./middleware/requireToken')
const UserModel = require('./models/UserModel')

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', ()=>{
    console.log("Connected to mongodb")
})

mongoose.connection.on('error', (err)=>{
    console.log("Error when connect to mongodb", err)
})

app.use(bodyParser.json())
app.use(UserRouter)

app.get('/', requireToken, (req,res)=>{
    res.send("Your email is "+ req.user)
})

app.listen(PORT, ()=>{
    console.log('Server is running')
})