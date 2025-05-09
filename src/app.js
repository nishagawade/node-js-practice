const express = require('express');
const connectDB = require('./config/database');
const { validateSignUpData } = require('./utils/validation')
const bcrypt = require('bcrypt')

const app = express();
const User = require('./models/user');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require('./middlewares/auth')


//for middleware we need to use app.use 

app.use(express.json())
app.use(cookieParser())
//sign up api


//for signup api

//validation of data 
//encrypt the password

app.post('/signup', async (req, res) => {
    console.log(req.body)


    try {
        validateSignUpData(req)

        const { firstName, lastName, emailId, password } = req.body

        const passwordHash = await bcrypt.hash(password, 10);


        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        await user.save();
        res.send("user added successfully")
    } catch (err) {
        res.status(400).send("error saving the user" + err.message)
    }

})

app.post('/login', async (req, res) => {

    try {
        const emailId = req.body.emailId?.trim().toLowerCase();
        const password = req.body.password;


        const user = await User.findOne({ emailId: emailId }).exec();;
        console.log(user, "user")
        if (!user) {
            throw new Error("Email is not present in DB")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {

            //we will use now jwt token to verify the user, when the user login from the client , server will give 
            //them a jwt token , after that when we send a connection request, view profile this token is used to verify the user 
            //in jwt we hide user id using a secret key which only server knows

            const token = jwt.sign({ _id: user._id }, "DEV@Tinder$789",
                { expiresIn: "1d" }
            );
            console.log(token)
            res.cookie("token", token)
            res.send("user login successfull")
        } else {
            throw new Error("password is not correct")
        }

    } catch (err) {
        res.status(400).send("error saving the user," + "" + err.message)
    }
})

app.get("/profile", userAuth, async (req, res) => {

    try {

        const user = req.user
        res.send(user)

    } catch (err) {
        res.status(400).send("error saving the user," + "" + err.message)
    }


})

app.post('/sendConnectionRequest', userAuth, (req, res) => {

    const user = req.user
    res.send(user.firstName + " is sending connection request")
})










connectDB().then(() => {
    console.log("mongodb is connected")
    app.listen(3001, () => {
        console.log("server is running successfully on port 3001...")
    })
}).catch((err) => {
    console.log("database is not connected")
})

