const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:[true,'user id is required']
    },
    friendId:{
        type:String,
        required:true
    },
    text:{
        type:String
    },
    file:{
        type:String
    }
},{timestamps:true})


module.exports = mongoose.model('messages',messageSchema)