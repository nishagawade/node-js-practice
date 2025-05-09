const express = require('express');
const connectDB = require('./config/database');
const app = express();

const cookieParser = require("cookie-parser");



//for middleware we need to use app.use 

app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/authorization');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter)



connectDB().then(() => {
    console.log("mongodb is connected")
    app.listen(3001, () => {
        console.log("server is running successfully on port 3001...")
    })
}).catch((err) => {
    console.log("database is not connected")
})

