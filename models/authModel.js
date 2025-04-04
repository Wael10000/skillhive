const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const validator = require('validator');

const userSchema =mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
    },
    email: {    
        type: String,
        required: [true, 'Email required'],
        unique: [true, 'Email already exists'],
        lowercase : true,
        validate : [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength:[ 4, 'Password must be at least 4 characters long'], 
        select: false,

    },
    confirmpassword: {
        type: String,
        required: [true, 'Password required'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!',
        },
    },
    });


   userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmpassword = undefined;
    next();
  
   });

   const User = mongoose.model('User', userSchema); // Corrected method name


    module.exports =User;
