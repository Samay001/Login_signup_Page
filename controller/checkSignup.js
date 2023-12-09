const userSchema = require("../models/schema");

exports.signup = async (req, res) => {
    try{
        console.log(req.body.name); 
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
        new userSchema(newUser).save()
        if(newUser.name && newUser.email && newUser.password)
        {
            res.status(201).json({
                success: true,
                data: newUser,
                message: 'User created successfully',
            });
        }
        else{
            res.status(400).json({
                success:false,
                message:"fill all details",
            });
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message,
        });
    }
};


