
const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { ConnectionRequest } = require('../models/connectionRequest');
const User = require('../models/user');
const { ObjectId } = require("mongoose").Types;

const requestRouter = express.Router()

requestRouter.post('/request/send/:status/:touserId', userAuth, async (req, res) => {

  try {

    const fromUserId = req.user._id;
    const toUserId = req.params.touserId;
    const status = req.params.status;

    const allowedStatus = ['interested', 'ignored']

    if (!allowedStatus.includes(status)) {
      return res.status(400).send({ message: "invalid status type" + status })
    }

    const toUser = await User.findById(toUserId);

    if (!toUser) {
      return res.status(404).send({ message: "user not found" })
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }

      ]
    })

    if (existingConnectionRequest) {
      return res.status(400).send({ message: "connection request already exists" })
    }

    const data = await connectionRequest.save()
    res.json({
      message: req.user.firstName + " is " + status + " in " + toUser.firstName,
      data
    })


  } catch (err) {
    res.status(400).send("error" + err.message)
  }



})

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ messaage: "Status not allowed!" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: new ObjectId(requestId),
        toUserId: new ObjectId(loggedInUser._id),
        status: "interested",
      }).populate("fromUserId", ["firstName", "lastName"]);

      console.log("Request ID:", requestId);
      console.log("Logged-in User ID:", loggedInUser._id);
      console.log("status", status)


      console.log("connectionRequest", connectionRequest)
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter