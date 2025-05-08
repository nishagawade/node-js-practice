const mongoose = require('mongoose');


//you need to add validations and unique emailid should be there
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 20
    },

    lastName : {
        type : String
    },

    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase: true,
        trim : true
    },

    password : {
        type : String,
        required : true
    },

    age : {
        type : Number,
        min : 18,
    },

    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    }, 

    photoUrl : {
        type : String
    },

    about : {
        type : String,
        default : "This is a default about"
    },

    skills : {
        type : [String]
    }
},{
    timestamps :true
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel