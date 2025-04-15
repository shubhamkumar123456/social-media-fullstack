const mongoose =require('mongoose');
const conversationSchema = new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],

    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'messages'
        }
    ]


})

module.exports = mongoose.model('conversation', conversationSchema)