import React from 'react'
import { Routes,Route } from 'react-router-dom'
/* React Router ke core components            Routes → container            Route → ek route define karta hai */
/* ///////////////////////////////////////////////////////// */
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
// import CursorGlow from "./components/CursorGlow";
import FloatingGradient from "./components/FloatingGradient";
import SmoothScroll from "./components/SmoothScroll";

////////////////////////////////////////////////////////////
  import { ToastContainer, toast } from 'react-toastify';


  /* 👉 Yeh common UI elements hai (har page pe dikhenge) */

const App = () => {  /* 👉 Yeh pura app ka layout define karta hai */  /* 👉 Global notification system enable karta hai */
  return (
   <div className='relative px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

  <FloatingGradient />

  {/* <CursorGlow /> */}

  <ToastContainer />

  <Navbar />
    <SmoothScroll />

  <SearchBar />

   <Routes>

    <Route path='/' element={<Home/>}/> 
    <Route path='/collection' element={<Collection/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>

      <Route path="/product/:productId" element={<Product />} />  {/* 👉 :productId = dynamic value  useParams() se access hota hai  */} 


      <Route path="/cart" element={<Cart />} />
    <Route path='/login' element={<Login/>}/>  
    <Route path='/place-order' element={<PlaceOrder/>}/> 
    <Route path='/orders' element={<Orders/>}/> 

    {/* <Route path="" element={<NotFound />} />CHAT GPT SUGGESTION */}
  

   </Routes>
   <Footer/>

   </div>
  )
}

export default App


/* Navbar
SearchBar
Routes (Page changes here)
Footer 
*/