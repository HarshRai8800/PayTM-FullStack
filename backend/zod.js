const zod = require("zod")



const validation = (firstname,lastname,username,password)=>{
const firstn = zod.string().min(1)
const lastn = zod.string().min(1)
const usern = zod.string().toLowerCase()
const pass = zod.string().min(6)

if(firstn.safeParse(firstname).success&&lastn.safeParse(lastname).success&&usern.safeParse(username)&&pass.safeParse(pass)){
    return true
}
else{
    return false
}}

const halfvalidation = (username,password)=>{
    const usern = zod.string().toLowerCase()
    const pass = zod.string().min(6)
    
    if(usern.safeParse(username)&&pass.safeParse(pass)){
        return true
    }
    else{
        return false
    }
    
}


module.exports ={
    halfvalidation,validation
}