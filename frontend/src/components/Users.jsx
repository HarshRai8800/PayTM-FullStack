import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
 function Users(){
    const [filter,setfilter] = useState(" ")
    const [users,setusers] = useState([])
    const [balance,setbalance] = useState(0)
  let [count,setcount] = useState(0)
const navigator = useNavigate()
    useEffect(() => {
        const fetchUsers = async () => {
            console.log("Fetching users");
            try {
                const token = localStorage.getItem("token");
                console.log(token);
                const response = await axios.get(`http://localhost:3022/api/v1/users/bulk?authorization=bearer ${token}&filter=${filter}`, {
                   
                });
                if (response.status === 200) {
                    console.log(response.data);
                    setusers(response.data.user);
                } else {
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [filter]);

  
      useMemo( async() => {
            console.log("Fetching users");
            try {
                const token = localStorage.getItem("token");
                console.log(token);
                const response = await axios.get(`http://localhost:3022/api/v2/accounts/balance?authorization=bearer ${token}`, {
                   
                });
                if (response.data.msg) {
                    console.log(response.data);
                 setbalance(response.data.msg)
                } else {
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        },[count])



function transaction(_id){
    console.log(_id)
navigator(`/transfer?to=${_id}`)
}
return(
<>
    
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded shadow-md">
        <div className="text-lg font-semibold">
            Your Balance: {balance}
        </div>
        <button onClick={()=>setcount(count++)} className="px-4 py-2 bg-white text-blue-500 rounded shadow hover:bg-gray-200">
            Refresh Balance
        </button>
    </div>

<div className="flex-col w-full p-8">
<input type="text"
placeholder="filter"
onChange={e=>setfilter(e.target.value)}
className="w-full p-6 shadow-emerald-200 h-12"
/>
<div className="flex-col w-full">
<div className="flex-col w-full">
    <div className="flex flex-wrap justify-start gap-4">
    <div className="flex-col w-full">
    <div className="flex justify-between w-full">
    <div className="flex-col w-full">
    {users.map((user) => (
        <div key={user._id} className="flex items-center p-4 bg-white shadow-md rounded-lg mb-2">
           <div className="flex items-center justify-center text-white text-xl font-bold rounded-full w-12 h-12
            bg-gradient-to-r from-emerald-400 to-blue-500 mr-4">
        {user.firstname.charAt(0)}
    </div>
            <div className="flex-grow">
                <div className="font-semibold">
                    {user.firstname} {user.lastname}
                </div>
            </div>
            <button
                onClick={()=>transaction(user._id)}
                className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
            >
                Send Money
            </button>
        </div>
    ))}
</div>

    </div>
</div>

    </div>
</div>


</div>



</div>
</>

)



}
export default Users
