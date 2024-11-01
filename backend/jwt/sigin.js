const jwt_secret = "1234"
const jwt = require("jsonwebtoken")

const sigin = (username)=>{
const token = jwt.sign({username},jwt_secret)
return token
}



module.exports = {
    sigin,
    jwt_secret
}