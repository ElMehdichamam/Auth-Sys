const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginController = async (req,res) =>{
    // check if user exist
    const {email,password} = req.body;
    const existUser = await User.findOne(email);
    if(!existUser){
        return res.status(400).json({
            message:"Invalid User"
        })
    };

    // compare password
    const isMatch = await bcrypt.compare(password,User.password);
    if(!isMatch){
        
    }
    // give it token 
    // logged in Succesfully
}