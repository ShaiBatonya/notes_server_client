const JWT = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async(req,res,next)=>{

    try {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new Error("not access")
        }

        const decode = await JWT.verify(token, "secretText");

        if(!decode) {
            throw new Error("not access");
        }

        const user = await User.findById(decode.user_id);

        if(!user) {
            throw new Error("not access");
        }
        
        next()

    } catch (error) {
        return res.status(401).json({
            message: `error in auth user request`,
            error: error.message
        })
    }
};


module.exports = auth