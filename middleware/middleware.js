const jwt = require('jsonwebtoken');

const validate = (schema,source='body') => (req,res,next)=>{
    const result = schema.safeParse(req[source]);
    if(!result.success){
        return res.status(400).json(result.error.errors);
    }
    req.body = result.data;
    next();
}

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"No token"});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({error:error.message});
    }
}

module.exports = {validate,auth};