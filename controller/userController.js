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


const getMe = async (req,res) =>{
    try {
    const User = await user.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({message:"User Not Found"});
        }
        res.json(user);
    } catch (error) {
       res.status(500).json({error:error.message});
    }
}

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
module.exports = {registerController,getMe,loginController};