const express = require('express');
const connectDB = require('./config/database');

const app = express();

// app.use((req, res)=>{
//     res.send("hello from the server")
// })

//above function is request handler


//get user request

app.get('/user', (req, res)=>{
    res.send({firstName : "Nisha", lastName : "Gawade"})
})

app.post('/user', (req, res)=>{
    console.log("save data");
    res.send("Data saved successfully")
})

app.delete('/user', (req, res)=>{
    res.send("data deleted successfully")
})


app.get('/test', (req, res , next)=>[
    //res.send("found user 1")
    next()
], (req, res)=>{
    res.send("found user 2")
})

  
  



connectDB()
.then(()=>{
    console.log("mongodb is connected")
    app.listen(3001 , ()=>{
        console.log("server is running successfully on port 3001...")
    })
}).catch((err)=>{
    console.log("database is not connected")
})

