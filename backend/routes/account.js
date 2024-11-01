const Router= require("express")
const {Bank} = require("../db")
const mongoose = require("mongoose")
const { jwt_secret } = require("../jwt/sigin")
const route = Router()
const jwt = require("jsonwebtoken")
const verify=(token)=>{

    const authorization =token
    console.log(token)
    console.log(authorization.startsWith("bearer "))
    if(!authorization.startsWith("bearer ")){
       null
    }
    const tokenn = authorization.split(" ")[1]
    console.log(tokenn)
    try {
        const username=jwt.verify(tokenn,jwt_secret)
        console.log(username)
     return username.username
    } catch (error) {
     return  null
    }
    
    
    
      }
    

route.get("/balance",async(req,res)=>{
console.log(verify(req.query.authorization))
    const balance=await Bank.findOne({
    userid:new mongoose.Types.ObjectId(`${verify(req.query.authorization)}`)
    })

    res.json({
        msg:balance.amount
    })
    
    
    })




    route.post("/transfer", async (req, res) => {
        const session = await mongoose.startSession();
        console.log(req.query.authorization)
    const _id = verify(req.query.authorization)
    console.log(_id+"47")
    if(!_id){
        res.json({
            msg:"authorization error"
        })
    }
        try {
            await session.withTransaction(async () => {
                // Step 1: Find the sender's account
                const user = await Bank.findOne({
                    userid: new mongoose.Types.ObjectId(`${_id}`)
                }).session(session);
    console.log(user)
                // Check if user has sufficient balance
                if (!user || user.amount < req.body.amount) {
                    throw new Error("Insufficient balance");
                }
    
                // Step 2: Find the recipient's account
                const toAccount = await Bank.findOne({
                    userid: new mongoose.Types.ObjectId(`${req.query.to}`)
                }).session(session);
                console.log(toAccount)
                if (!toAccount) {
                    throw new Error("Invalid recipient account");
                }
    
                // Step 3: Deduct amount from sender's account
                await Bank.updateOne(
                    { userid: new mongoose.Types.ObjectId(`${_id}`) },
                    { $inc: { amount: -req.body.amount } }
                ).session(session);
    
                // Step 4: Add amount to recipient's account
                await Bank.updateOne(
                    { userid: new mongoose.Types.ObjectId(`${req.query.to}`) },
                    { $inc: { amount: req.body.amount } }
                ).session(session);
    
                res.status(200).json({ msg: "Transfer successful" });
            });
        } catch (error) {
            await session.abortTransaction();
            res.status(400).json({ msg: error.message });
        } finally {
            session.endSession();
        }
    });
    


module.exports=route
