 export default function ({label,warning,onClick}){

return(
<div className="flex items-center w-full p-4">
  <div className="w-2/3 p-2 text-center">
    {warning}
  </div>
  <div className="flex-grow text-center">
    <button 
      className="text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out px-6 py-2 focus:outline-none"
      onClick={onClick}
    >
      {label}
    </button>
  </div>
</div>




)


 }