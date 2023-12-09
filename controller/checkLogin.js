const userSchema = require("../models/schema");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const user = await userSchema.findOne({ email: email });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                res.status(201).json({
                    success: true,
                    data: "successfully logged in",
                    message: 'User logged in successfully',
                });
            } else {
                res.status(401).json({
                    success: false,
                    data: "Invalid login credentials",
                    message: 'Check your login credentials',
                });
            }
        } else {
            res.status(401).json({
                success: false,
                data: "User not found",
                message: 'Check your login credentials',
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
