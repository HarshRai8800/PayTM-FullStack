import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useParams } from 'react-router-dom'
import './index.css'

import {BrowserRouter,RouterProvider,Routes,createBrowserRouter} from "react-router-dom"
import Signup from './pages/signup.jsx'
import Signin from './pages/signin.jsx'
import Dash from './pages/Dash.jsx'
import Transfer from './pages/Transfer.jsx'

const router =createBrowserRouter( [{
  path:"/signup",
  element:<Signup/>
},
{
  path:"/",
  element:<Signin/>
},{
  path:"/dashboard",
  element:<Dash/>
}
,
{
  path:`/transfer/*`,
  element:<Transfer/>
}
])


createRoot(document.getElementById('root')).render(

   <RouterProvider router={router}/>


)
