const express = require('express');
const {userAuth} = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {

    try {

        const user = req.user
        res.send(user)

    } catch (err) {
        res.status(400).send("error saving the user," + "" + err.message)
    }


})


profileRouter.patch('/profile/edit', userAuth, async(req, res)=>{
     
    try{
       if(!validateEditProfileData){
        throw new Error("invalid edit request")
       }

       const loggedInuser =req.user;
       console.log("prev data",loggedInuser )

       Object.keys(req.body).forEach((key)=> (loggedInuser[key] = req.body[key]))
       await loggedInuser.save()
       console.log("after data",loggedInuser );

    }catch(err){
        res.status(400).send("error" + "" + err.message)
    }
})


module.exports = profileRouter