const mongoose = require('mongoose');
const { number, minLength } = require('zod');

const userSchema = new mongoose.Schema({
    email:{
        type : string,
        required : true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
    },
    password:{
        type : string,
        required : true,
        minLength:8
    }
});
module.exports = mongoose.model('User',userSchema);