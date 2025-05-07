const express = require('express');
const connectDB = require('./config/database');

const app = express();
const User = require('./models/user')


//for middleware we need to use app.use 

app.use(express.json())
//sign up api


app.post('/signup', async(req, res)=>{
    console.log(req.body)

    const user = new User(req.body)
    try{
        await user.save();
        res.send("user added successfully")
    }catch(err){
        res.status(400).send("error saving the user" + err.message)
    }

})


  
  



connectDB().then(()=>{
    console.log("mongodb is connected")
    app.listen(3001 , ()=>{
        console.log("server is running successfully on port 3001...")
    })
}).catch((err)=>{
    console.log("database is not connected")
})

