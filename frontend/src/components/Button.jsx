export default ({label,onclick})=>{
    console.log(label)
    console.log(onclick)
return(
<div className="w-full bg-slate-950 flex justify-center items-center p-4">
  <button 
    className="text-white hover:underline focus:outline-none px-4 py-2"
    onClick={onclick}
  >
    {label}
  </button>
</div>


)

}