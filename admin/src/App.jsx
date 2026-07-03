import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/orders'
import { useState ,useEffect } from 'react'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';


/////// IN THIS WE ARE GOING TO STOR OUR BACKEND URL   """"||||    AND WE WILL GET THIS BACKEND URL FROM THE ENVIRONMENTY VARIABLES   
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export  const currency = '$'


const App = () => {
const [token, setToken] = useState("")

  ///// here we will add a turnery operator so thast if the token is available then it will display all the components mentioned from Navbar and if token is not availavbele then it will dispakly Login Component 


/////// when we refresh at admin portol it automatically logout to solve such error we need to do this okey 
useEffect(() => {
  const storedToken = localStorage.getItem("token")
  console.log("LOADED TOKEN:", storedToken)

  if (storedToken) {
    setToken(storedToken)
  }
}, [])

useEffect(() => {
  if (token) {
    localStorage.setItem("token", token)
  }
}, [token])



  return (
    <div className='bg-gray-100 min-h-screen '>
<ToastContainer/>
      {
        token === ""
          ? <Login  setToken={setToken} />
          : <>

            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full '>
              <Sidebar />
              <div className='w-[70%] mx-auto  ml-[max(5vw ,25px)] my-8 text-gray-600 text-base  '>
                <Routes>
                  <Route path='/add' element={<Add  token={token} />} />
                  <Route path='/list' element={<List  token={token} />} />
                  <Route path='/order' element={<Orders  token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }


    </div>
  )
}

export default App
