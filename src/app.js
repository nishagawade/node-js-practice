const express = require('express');
const connectDB = require('./config/database');
const app = express();

const cookieParser = require("cookie-parser");
const cors = require('cors');



//for middleware we need to use app.use 
app.use(cors({
    origin : "http://localhost:5173", //backend should know where frontend is hosted, that is we should whitelist the ip
    credentials : true
}))
//cookies will send to the browser from your token
app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/authorization');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const { userRouter } = require('./routes/userRequest');
const { paymentRouter } = require('./routes/payment');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter)
app.use('/', paymentRouter)



connectDB().then(() => {
    console.log("mongodb is connected")
    app.listen(3001, () => {
        console.log("server is running successfully on port 3001...")
    })
}).catch((err) => {
    console.log("database is not connected")
})

