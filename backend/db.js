
const mongoose = require("mongoose")


 mongoose.connect("enter your mongodb url")


  const user =new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    
  })


const bank = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true

    },
    amount:{
        type:Number,
        required:true
    }
})

 const Bank = mongoose.model("bank",bank)
 const  User =mongoose.model("user",user)

 module.exports={
    Bank,User
 }
