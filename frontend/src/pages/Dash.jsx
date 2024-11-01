import { useState,useEffect } from "react";
import Users from "../components/Users"
import axios from "axios";
export default function Dash(){
const [first,setfirst] = useState("")
useEffect(()=>{
const fetching  =async()=>{
const auth = localStorage.getItem("token")
console.log(auth)
try {
    const msg =await axios.get(`http://localhost:3022/api/v1/users/get?authorization=bearer ${auth}`)
    console.log(msg.data)
    if(msg.status==200){
setfirst(msg.data.user.firstname)
    }
} catch (error) {
    
}
}
fetching()
},[])




return(
<div className="flex-col items-stretch">
<div className="flex items-center justify-between border-b p-4 bg-white shadow-md">
    <div className="text-lg font-bold">
        PayTM App
    </div>
    <div className="flex items-center">
        <div className="text-lg pr-16 w-12 h-12 flex items-center justify-center font-bold mr-2">
            
            {first}
        </div>
        <div className="text-lg rounded-full w-12 h-12 bg-slate-500 flex items-center justify-center text-white font-bold">
            {/* Placeholder for another user initial */}
            {first.charAt(0)}
        </div>
    </div>
</div>


<div className="flex-col w-full p-4">
    <Users/>
</div>
</div>
)
















}