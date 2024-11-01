const Router = require("express")
const {sigin}=  require("../jwt/sigin")
const jwt = require("jsonwebtoken")
const {validation,halfvalidation} = require("../zod")
const  {User,Bank} = require( "../db")
const zod = require("zod")
const {jwt_secret} = require("../jwt/sigin")
const { default: mongoose } = require("mongoose")
const route = Router()

const verify=(token)=>{

    const authorization =token
    console.log(authorization.startsWith("bearer"))
    if(!authorization.startsWith("bearer")){
      return null
    }
    const tokenn = authorization.split(" ")[1]
    console.log(tokenn)
    try {
        const username=jwt.verify(tokenn,jwt_secret)
        console.log(username)
     return username
    } catch (error) {
     return   null
    }
    
    
    
      }
    

route.post("/signup",async(req,res)=>{

const username = req.body.username
const firstname = req.body.firstname
const lastname = req.body.lastname
const password = req.body.password
if(!validation(firstname,lastname,username,password)){
    return res.status(411).json({msg:"there is an error in input validation"})}

    

const alreasdyuser =await User.findOne({username:username})
if(alreasdyuser){
    return res.status(411).json({msg:"email already exists"})}

const user = await User.create({
    firstname,
    lastname,
    username,
    password
})
const account = await Bank.create({
    userid:user._id,
    amount:Math.floor(Math.random()*1000) 
})

const token = sigin(user._id)



res.status(200).json({

    msg:"user created successfull",
    token:token
})



})



route.get("/get",async(req,res)=>{
    console.log(req.query)
const _id = verify(req.query.authorization)
    if(!verify(req.query.authorization)){
        return res.status(411).json({msg:"authorization heder sent wrong"})
    }
console.log(_id)
const user = await User.findOne({
    _id:new mongoose.Types.ObjectId(`${_id.username}`)
})
    if(user){
        res.status(200).json({
            user
        })
    }

})

route.get("/signin",async(req,res)=>{

    const username = req.body.username
    const password = req.body.password
if(!halfvalidation(username,password)){
    return res.status(411).json({msg:"there is an error in input validation"})
}

const alreasdyuser =await User.findOne({username:username,password:password})
console.log(alreasdyuser)
if(!alreasdyuser){
    return res.status(411).json({msg:"email not  exists"})}


const token = sigin(alreasdyuser._id)

res.status(200).json({

    msg:"user sigin successfull",
    token:token
})



})




route.put("/update",async(req,res)=>{

const obj = zod.object({
firstname:zod.string().min(1),
lastname:zod.string().min(1),
password:zod.string().min(4)




})
if(!obj.safeParse({firstname:req.body.firstname,
    lastname:req.body.lastname,
    password:req.body.password}).success){
        res.status(411).json({
            msg:"input not validated"
        })
    }

const userr =await User.updateOne({firstname:req.body.firstname},
    {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password
    }
)

    if(userr){
        return res.status(200).json({msg:"compoleted"})
        
    }
})
// route.use(verify)
route.get("/bulk",async(req,res)=>{


if(!verify(req.query.authorization)){
    return res.status(411).json({msg:"authorization heder sent wrong"})
}

const filter = req.query.filter || ""

const users =await User.find({
    $or:[{
        firstname:{"$regex":`^${filter}`}
    },
{
    lastname:{
        "$regex":`^${filter}`
    }
}]
})
if(users!==undefined){
    console.log(users)
return res.status(200).json({
  user:users.map((user)=>({
    lastname:user.lastname,
    firstname:user.firstname,
    username:user.username,
    _id:user._id
  }))
})
}



})

module.exports=route