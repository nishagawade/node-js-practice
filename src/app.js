const express = require('express');
const connectDB = require('./config/database');

const app = express();
const User = require('./models/user')

//sign up api


app.post('/signup', async(req, res)=>{
    const userobj = {
        firstName : "Nisha",
        lastName : "Gawade", 
        emailId : "nishagawade2021@gmail.com",
        password : "Nisha@123"
    }
//creating a new instance of a user model
    const user = new User(userobj)
    await user.save()

    res.send("user added successfully")
})


  
  



connectDB().then(()=>{
    console.log("mongodb is connected")
    app.listen(3001 , ()=>{
        console.log("server is running successfully on port 3001...")
    })
}).catch((err)=>{
    console.log("database is not connected")
})

