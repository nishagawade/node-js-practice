const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema({

    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },

    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
         required : true
    },

    status : {
        type : String,
         required : true,
        enum : {
           values : ["ignored", "interested", "accepted", "rejected"],
           message : `{VALUE} is incorrect status type`
        }
       
    }
}, {
    timestamps : true
})


//indexing makes api faster and queries faster
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function(next){
    const connectionRequest =this 

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connection request to yourself")
    }
    next()
})

const ConnectionRequest = new mongoose.model("ConnectionRequest" , connectionRequestSchema);
module.exports = {
    ConnectionRequest
}