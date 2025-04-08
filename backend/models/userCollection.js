const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'minimum length show be greater than 3 characters'],
    },
    lastName: {
        type: String,
        minLength: [3, 'minimum length show be greater than 3 characters'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
        
    },
    bio: {
        type: String,
        default: 'this is bio'
    },
    // role:{
    //     type:String,
    //     default:"user"
    // }
}, { timestamps: true })

userSchema.add({
    resetPasswordToken:{
        type:String,
        expires:'1'
    },

    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    followings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],

    profilePic:{
        type:String,
        default:"https://as2.ftcdn.net/v2/jpg/10/54/09/27/1000_F_1054092780_liObYQo10Pn2xOo4CmGYZMeWiw0P7CT2.jpg"
    },
    coverPic:{
        type:String,
        default:"https://png.pngtree.com/thumb_back/fh260/background/20220312/pngtree-light-gray-background-texture-image_995291.jpg"
    },
    
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});



module.exports = mongoose.model('users', userSchema)



