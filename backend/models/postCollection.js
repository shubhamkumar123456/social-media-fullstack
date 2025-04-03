const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    file:[],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],

    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
            },
            text:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now
            },
            reply:[],
            commentLikes:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'users'
                }
            ]
        }
    ]


},{timestamps:true})

module.exports = mongoose.model('posts' ,postSchema )