import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Transfer(){

const navigate = useNavigate()
const [SearchParams] = useSearchParams()
const to = SearchParams.get("to")
console.log(to)
const [money,setmoney] = useState(0)



async function transfer(e){
    e.preventDefault()
    console.log(to)
    console.log(money)
    
const authorization = localStorage.getItem("token")
console.log(authorization)
try {
    const msg = await axios.post(`http://localhost:3022/api/v2/accounts/transfer?authorization=bearer ${authorization}&to=${to}`,{
    amount:money
    })
    console.log(msg)
    if(msg.status==200){
navigate("/dashboard")
    }

} catch (error) {
  console.log(error)  
}


}

return(

<div className="min-h-screen bg-gray-200 flex items-center justify-center">
  <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10 h-80">
    <h2 className="text-xl font-semibold mb-4">Send Money</h2>

    <div className="flex items-center mb-4">
      <div className="text-lg rounded-full w-12 h-12 bg-slate-500 flex items-center justify-center text-white font-bold mr-2">
        💰
      </div>
      <div className="text-lg font-medium">Transfer Funds</div>
    </div>

    <form className="flex flex-col w-full" onSubmit={transfer}>
      <label className="mb-2 text-sm font-medium" htmlFor="amount">Amount (in Rs)</label>
      <input
        type="text"
        id="amount"
        onChange={(e) => setmoney(e.target.value)}
        placeholder="Enter Amount"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Initiate Transfer
      </button>
    </form>
  </div>
</div>

    


)

}