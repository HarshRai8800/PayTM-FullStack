const router = require("./routes/mainuser")
const cors = require("cors")
const express = require("express")
const account = require("./routes/mainaccount")

const app = express()
app.use(cors())

app.use(express.json())

app.use("/api/v1",router)

app.use("/api/v2",account)



  const port = 3022
app.listen(port,()=>{
    console.log("listening on port"+ port)
})


