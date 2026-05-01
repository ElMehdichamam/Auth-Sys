const validate = (schema,source='body') => (req,res,next)=>{
    const result = schema.safeParse(source[req.body]);
    if(!result.success){
        return res.status(400).json(result.error.errors);
    }
    req.body = result.data;
    next();
}
module.exports = validate;