const express = require('express');
const { validateSignUpData } = require('../utils/validation')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {

    //sign up api


    //for signup api

    //validation of data 
    //encrypt the password
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

authRouter.post('/login', async (req, res) => {

    try {
        const emailId = req.body.emailId?.trim().toLowerCase();
        const password = req.body.password;


        const user = await User.findOne({ emailId: emailId }).exec();
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

authRouter.post('/logout', async(req, res)=>{
    res.cookie("token", null, {
        expires : new Date(Date.now())
    });

    res.send("logout successfull")
})


module.exports = authRouter