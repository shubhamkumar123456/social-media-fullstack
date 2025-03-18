const mongoose = require('mongoose');


const connectToDB= async()=>{
    try {
       await mongoose.connect('mongodb://127.0.0.1:27017/social12-2')
       console.log("connected to mongodb successfully")
    } catch (error) {
    console.log('error in connectiong mongodb')
    console.log(error.message)
    }
   
}

module.exports = connectToDB