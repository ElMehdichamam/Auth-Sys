const mongoose = require('mongoose');
const { number, minLength } = require('zod');

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
    },
    password:{
        type : String,
        required : true,
        minLength:8
    }
});
module.exports = mongoose.model('User',userSchema);