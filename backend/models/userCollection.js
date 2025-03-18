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
}, { timestamps: true })

userSchema.add({
    resetPasswordToken:{
        type:String,
        expires:'1'
    }
    
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



