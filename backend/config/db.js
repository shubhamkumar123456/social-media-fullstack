const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB= async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL)
       console.log("connected to mongodb successfully")
    } catch (error) {
    console.log('error in connectiong mongodb')
    console.log(error.message)
    }
   
}

module.exports = connectToDB