import { BrowserRouter, RouterProvider, Router, createBrowserRouter, Navigate } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import ProtectedRoutes from "./components/ProtectedRoutes"
import About from "./pages/About"
import Contact from "./pages/Contact"

import { useContext, useEffect } from "react"
import { GlobalContext, GlobalContextProvider } from "./context/useGlobalContext"

 import {loader as singleResipieLoader} from './pages/SingleResipie'

import { auth } from "./firebase/fireBaseConfig"
import { onAuthStateChanged } from "firebase/auth"

import {action as signupAction} from './pages/Signup'
import {action as signinAction} from './pages/Signin'
import {action as createAction} from './pages/Create'

import Create from "./pages/Create"
import SingleResipie from "./pages/SingleResipie"

function App() {
const { user, dispatch, authChange } = useContext(GlobalContext)
const routes = createBrowserRouter([
  {
    path:"/",
    element: <ProtectedRoutes user={user}>
      <MainLayout/>
    </ProtectedRoutes> ,
    children:[
      {
        index:true,
        element:<Home/>
      },

      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },

      {
        path:"/create",
        element:<Create/>,
        action:createAction
      },
      {
        path:"/singleResipie/:id",
        element:<SingleResipie/>,
        loader: singleResipieLoader
      }

    ]
  },
  {
    path:"/signin",
    element: user ? <Navigate to="/" /> : <Signin/>,
    action: signinAction, 

  },
  {
    path:"/signup",
    element: user ? <Navigate to="/" /> : <Signup/>,
    action: signupAction, 
  }
])

useEffect(()=>{
  
onAuthStateChanged(auth, (user) => {
 dispatch({
  type:"SIGN_IN",
  payload: user
 });
 dispatch({
  type:"AUTH_CHANGE",
 })
});
},[])

  return <>{authChange && <RouterProvider router={routes}/>}</>
}

export default App
