const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

//this function ensures a user is authenticated before continuing
const auth = async (req,res,next)=>{
    try{
        
        //token is sent through header 
        const token = req.header('Authorization').replace('Bearer ','')
        //token is decrypted and should now conatin the users's _id
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id})
        
        if (!user){
            throw new Error("No user")
        }

        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(401).send({error: "You must login to complete this action"})
    }
}

module.exports = auth

