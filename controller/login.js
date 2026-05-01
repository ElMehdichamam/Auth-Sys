const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginController = async (req,res) =>{
    try {
    // check if user exist
    const {email,password} = req.body;
    const existUser = await User.findOne({email});
    if(!existUser){
        return res.status(400).json({
            message:"Invalid User"
        });
    };

    // compare password
    const isMatch = await bcrypt.compare(password,existUser.password);
    if(!isMatch){
        return res.status(400).json({
            message:"Invalid Password"
        });
    }
    // give it token 
    const token = jwt.sign(
        {id: existUser._id},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    // logged in Succesfully
    res.status(200).json({
        message:"Logged In Succesfully",
        token
    });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}