 const jwt_secret = "12345"
const jwt = require("jsonwebtoken")




 const verify=(req,res,next)=>{

const authorization = req.headers.authorization

if(!authorization||!authorization.startsWith("bearer ")){
    res.status(411).json({msg:"authorization heard sent wrong"})
}
const token = authorization.split(" ")[1]

try {
    const {_id}=jwt.verify(token,jwt_secret)
 next()
   
} catch (error) {
    res.status(411).json({msg:"jwt token sent wrong sent wrong"})
}



  }
module.exports={verify,jwt_secret } 