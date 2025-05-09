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

//sample apis

//need to fetch users using email id

// app.get('/user', async (req, res) => {

//     const userEmail = req.body.emailId;


//     try {
//         const user = await User.find({ emailId: userEmail })

//         if (user.length == 0) {
//             res.status(400).send("user not found")
//         } else {
//             res.send(user)
//         }


//     } catch (err) {
//         res.status(400).send("something went wrong")
//     }
// })


// //how to fetch all users fromt the database 

// app.get('/fetch', async (req, res) => {

//     try {

//         const users = await User.find({});
//         res.send(users)

//     } catch (err) {
//         res.status(400).send("something went wrong")
//     }
// })

// //delete api

// app.delete('/user', async (req, res) => {



//     try {
//         const userId = req.body.userId;
//         const user = await User.findByIdAndDelete(userId);
//         res.send("user deleted successfully")

//     } catch (err) {
//         res.status(400).send("something went wrong")
//     }

// })


// //update api using patch

// app.patch('/user', async (req, res) => {
//     const userId = req.body.userId;
//     const data = req.body




//     try {

//         // const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills", "lastName"];

//         // const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

//         // if (!isUpdateAllowed) {
//         //     throw new Error("update not allowed")
//         // }

//         const user = await User.findByIdAndUpdate(userId, data, { new: true });
//         console.log(user)

//         res.send("user updated successfully")



//     } catch (err) {
//         res.status(400).send("something went wrong" + err)
//     }
// })