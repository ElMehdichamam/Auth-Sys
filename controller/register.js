const User = require('../models/user');
const bcrypt = require('bcrypt');
const registerController = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const existing = await User.findOne(email);
        if(exitsting){
            return res.status(400).json({message:"Email Already Exsist"});
        }
        const hashedPass = await bcrypt.hash(password,10);
        const user = User.create({
            email,
            password:hashedPass
        });
        res.status(201).json({
            message:"User Hasbeen Created Succesfully"
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports = registerController;