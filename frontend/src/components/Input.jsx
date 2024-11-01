export default ({label,onChange,placeholder})=>{
return(
<div className="w-full flex flex-col justify-center">
  
  
  <h2 className="text-left px-2 py-1 font-medium text-gray-700">{label}</h2>
  

  <input 
    type="text" 
    placeholder={placeholder} 
    onChange={onChange} 
    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

</div>

)

}