import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/label";
import Sublabel from "../components/Sublabel";
import axios from "axios"
import Warning from "../components/Warning";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
function Signin(){
const navigate = useNavigate()
const [username,setusername] = useState()
const [error,seterror] = useState("")
const [password,setpassword]=useState()

async function Setuser(){
    console.log(firstname,lastname,username,password)
const msg =await axios.post("http://localhost:3022/api/v1/users/signin",{
  
   username,
   password
}
)
if(msg.status==200){
    navigate("/dashboard")
    }
    else{
        seterror(msg.data.msg)
    }
    
}
function navuser(){

    navigate("/signup")

}
    return(

<div className="w-screen h-screen bg-slate-300 flex items-center justify-center">
  <div className="bg-slate-50 w-full max-w-md p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
    
   
    <Label label="Signin" className="text-3xl font-extrabold text-center text-black" />

 
    <Sublabel label="Enter your information to sigin tp your account" className="text-center text-sm text-gray-600" />
  <Error error={error}/>
    <div className="space-y-3 w-full">
    
      <Input label="Enter your username" onChange={(e) => setusername(e.target.value)} placeholder="Username" className="w-full" />
      <Input label="Enter your password" onChange={(e) => setpassword(e.target.value)} placeholder="Password" type="password" className="w-full" />
    </div>

    <Button onclick={Setuser} label={"ENTER"}  className="w-full bg-black text-white py-2 rounded-lg text-center font-medium hover:bg-gray-800" />
    <Warning onClick={navuser} label={"Sigin"} warning={"Already have an account?"}/>
  </div>
</div>

    )
}
export default Signin