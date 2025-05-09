const validator = require('validator')

const validateSignUpData = (req) =>{

    const {firstName, lastName, emailId, password} = req.body

    if(!firstName || !lastName) {
        throw new Error("Name is required")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")

    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a strong password")
    }
}

const validateEditProfileData = (req) =>{
  
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "age" , "about", "skills"]

    const isEditAllowed = Objects.keys(req.body).forEach((field)=>allowedEditFields.includes(field));

    return isEditAllowed
}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}