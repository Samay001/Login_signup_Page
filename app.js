const express = require("express");
const path = require("path");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const static_path = path.join(__dirname,"/public"); 
app.use(express.static(static_path)); //index.html ko load karne ke leye

app.use(express.json());//This middleware is responsible for parsing incoming requests with JSON payloads
app.use(express.urlencoded({extended:false}));


const dbConnect = require("./config/database");
dbConnect();

app.get("/",(req,res) =>{
    res.send("404 page not found");
});

const userSchema = require("./models/schema");
const checkSignup = require("./controller/checkSignup");
const checkLogin = require("./controller/checkLogin");

// app.post("/signup", async (req,res) =>{
//     try{
//         console.log(req.body.name); 
//         const newUser = {
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password
//         }
//         new userSchema(newUser).save()
    
//         res.status(201).json({
//             success: true,
//             data: newUser,
//             message: 'User created successfully',
//         });
//     }
    
//     catch (err) {
//         console.error(err);
//         res.status(500).json({
//             success: false,
//             data: "Internal server error",
//             message: err.message,
//         });
        
//     }
    
// });
app.post("/signup", checkSignup.signup);
app.post("/login", checkLogin.login);

// app.post("/login",async(req,res) =>{
//     try{
//         const email = req.body.email;
//         const password = req.body.password;
//         // console.log(password);
//         const userEmail = await userSchema.findOne({email:email});
//         // console.log(userEmail.password);
//         if(password === userEmail.password){
//             res.status(201).json({
//                 success: true,
//                 data: "successfully logged in",
//                 message: 'User created successfully',
//             });
//         }
//         else{
//             res.send("Somethings is incorrect");
//         }
//     }   
//     catch (err) {
//         console.error(err);
//         res.status(500).json({
//             success: false,
//             data: "Internal server error",
//             message: err.message,
//         });
//     } 
// });

app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
})