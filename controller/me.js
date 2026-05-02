const user = require('../models/user');

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
module.exports = getMe;