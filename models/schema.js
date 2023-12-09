const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 20,
        },
        email: {  
            type: String,
            required: true,
            unique: true, 
            maxLength: 255,
        },
        password: {  
            type: String,
            required: true,
            maxLength: 20,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            required: true,
            default: Date.now(),
        }
    }
);

//middleware which takes callback function as next
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the hashed password is ${this.password}`);
    }
    next();
});

module.exports = mongoose.model("User", userSchema); 
