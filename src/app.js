const express = require('express');
const connectDB = require('./config/database');
const {validateSignUpData} = require('./utils/validation')
const bcrypt = require('bcrypt')

const app = express();
const User = require('./models/user')


//for middleware we need to use app.use 

app.use(express.json())
//sign up api


//for signup api

//validation of data 
//encrypt the password

app.post('/signup', async (req, res) => {
    console.log(req.body)

    
    try {
         validateSignUpData(req)
 
         const {firstName, lastName, emailId, password} = req.body

         const passwordHash = await bcrypt.hash(password , 10);

      
        const user = new User({
            firstName,
             lastName, 
             emailId, 
             password : passwordHash
        })
        await user.save();
        res.send("user added successfully")
    } catch (err) {
        res.status(400).send("error saving the user" + err.message)
    }

})

app.post('/login', async(req, res)=>{

    try{
       const {emailId, password} = req.body;
       
       const user = await User.findOne({emailId : emailId});
       if(!user){
        throw new Error("Email is not present in DB")
       }
       const isPasswordValid =  await bcrypt.compare(password, user.password);

       if(isPasswordValid){
         res.send("user login successfull")
       }else{
        throw new Error("password is not correct")
       }

    }catch(err){
        res.status(400).send("error saving the user" + err.message)
    }
})


//need to fetch users using email id

app.get('/user', async (req, res) => {

    const userEmail = req.body.emailId;


    try {
        const user = await User.find({ emailId: userEmail })

        if (user.length == 0) {
            res.status(400).send("user not found")
        } else {
            res.send(user)
        }


    } catch (err) {
        res.status(400).send("something went wrong")
    }
})


//how to fetch all users fromt the database 

app.get('/fetch', async (req, res) => {

    try {

        const users = await User.find({});
        res.send(users)

    } catch (err) {
        res.status(400).send("something went wrong")
    }
})

//delete api

app.delete('/user', async (req, res) => {



    try {
        const userId = req.body.userId;
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully")

    } catch (err) {
        res.status(400).send("something went wrong")
    }

})


//update api using patch

app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const data = req.body




    try {

        // const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills", "lastName"];

        // const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        // if (!isUpdateAllowed) {
        //     throw new Error("update not allowed")
        // }

        const user = await User.findByIdAndUpdate(userId, data, { new: true });
        console.log(user)

        res.send("user updated successfully")



    } catch (err) {
        res.status(400).send("something went wrong" + err)
    }
})








connectDB().then(() => {
    console.log("mongodb is connected")
    app.listen(3001, () => {
        console.log("server is running successfully on port 3001...")
    })
}).catch((err) => {
    console.log("database is not connected")
})

