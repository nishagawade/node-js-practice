const jwt = require("jsonwebtoken");
const User = require('../models/user')

const userAuth = async(req, res, next) =>{

    //Read the token from the req cookeies, 
    //validate the token 
    //find the user

    try{
        const {token} = req.cookies;

        if(!token){
            throw new Error("token is not valid")
        }
        const decodedMessage = await jwt.verify(token, "DEV@Tinder$789") 
    
        const {_id} = decodedMessage;
    
        const user = await User.findById(_id);
    
        if(!user){
            throw new Error("User not found")
        }
       
        req.user = user;  //loggedin user
        next()

    }catch(err){
      res.status(400).send("error" + err.message)
    }

  
}

module.exports = {
    userAuth
}