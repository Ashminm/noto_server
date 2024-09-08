const JWT = require('jsonwebtoken')

const jwtMiddileware=(req,res,next)=>{
    try{
        const token=req.headers['authorization'].split(" ")[1]
        if(token){
            const jwtResponce=JWT.verify(token,process.env.JWT__SECRET_KEY)
            req.payload=jwtResponce.UserId
            next()
        }else{
            res.status(406).json("Token not Available")
        }
    }catch(err){
        res.status(401).json("Authorization faild!! Please create a passcode!!")
        console.log("Authorization faild!! Please create a passcode!!"+err);
        
    }
    
}

module.exports=jwtMiddileware