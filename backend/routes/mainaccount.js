const Router = require("express")
const route = require("./account")
const router = Router()



router.use("/accounts",route)





module.exports=router