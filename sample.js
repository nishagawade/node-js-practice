//sample code

// app.use((req, res)=>{
//     res.send("hello from the server")
// })

//above function is request handler


//get user request

// app.get('/user', (req, res)=>{
//     res.send({firstName : "Nisha", lastName : "Gawade"})
// })

// app.post('/user', (req, res)=>{
//     console.log("save data");
//     res.send("Data saved successfully")
// })

// app.delete('/user', (req, res)=>{
//     res.send("data deleted successfully")
// })


// app.get('/test', (req, res , next)=>[
//     //res.send("found user 1")
//     next()
// ], (req, res)=>{
//     res.send("found user 2")
// })

//signup api (sample)

// app.post('/signup', async(req, res)=>{
//     const userobj = {
//         firstName : "Nisha",
//         lastName : "Gawade", 
//         emailId : "nishagawade2021@gmail.com",
//         password : "Nisha@123"
//     }
// //creating a new instance of a user model
//     const user = new User(userobj)
//     await user.save()

//     res.send("user added successfully")
// })