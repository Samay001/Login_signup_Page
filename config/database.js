const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    })
    .then(() => console.log("Connected to Mongodb"))
    .catch((err) => {
        console.log("Error in connecting to the MongoDB");
        console.log(err.message);
        process.exit(1);
    });
}

module.exports = dbConnect;