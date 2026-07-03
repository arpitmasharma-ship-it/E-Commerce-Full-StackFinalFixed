
// import { assets } from '../assets/assets'  /* 👉 Images/icons (logo, cart, menu etc.) */
// import { Link, useNavigate, NavLink } from 'react-router-dom' /* ✅ Link  👉 Page reload ke bina navigation  && ✅ NavLink 👉 Special link (active state detect karta hai)*/
// import { useState, useContext } from 'react' /*  ✅ useContext 👉 Global data access (cart count, search etc.) */
// /* ✅ ShopContext 👉 Global data  store (cart, search) */
// import React from 'react'
// import { ShopContext } from '../context/ShopContext'
// const Navbar = () => {

//     const navigate = useNavigate();
//     /* MY mistake is ki mena return ke ander usestate bana diya tha isliye waha error aa raha tha okey   */
//     const [visible, setVisible] = useState(false);
//     const { search, setSearch, showSearch, setShowSearch, getCartCount, setToken, token, setCartItems } = useContext(ShopContext);


    
//     const logout = () => {
//         navigate('/login')
//         localStorage.removeItem('token')
//         setToken('')
//         setCartItems({})

//     }









//     return (

//         <div className='flex items-center justify-between py-5 font-medium '  >

//             <Link to="/"><h2 className='text-4xl font-semibold text-gray-300 hover:text-black ' >Aks</h2></Link>

//             <ul className='hidden sm:flex gap-5 text-sm  text-gray-700'>

//                 <NavLink to='/' className='flex flex-col items-center gap-1 '>
//                     <p>Home</p>
//                     <hr className='w-[50px] border-none h-[1.5px] bg-gray-700 hidden' />  {/* IT IS GIVING US AN UNDERLINE  */}
//                 </NavLink>

//                 <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
//                     <p>Collection</p>
//                     <hr className='w-[50px] border-none h-[1.5px] bg-gray-700 hidden ' />
//                 </NavLink>


//                 <NavLink to='/about' className='flex flex-col items-center gap-1 '>
//                     <p>About</p>
//                     <hr className='w-[50px] border-none h-[1.5px] bg-gray-700 hidden ' />
//                 </NavLink>


//                 <NavLink to='/contact' className='flex flex-col items-center gap-1 '>
//                     <p>Contact</p>
//                     <hr className='w-[50px] border-none h-[1.5px] bg-gray-700 hidden ' />
//                 </NavLink>


//             </ul>

//             <div className='flex items-center gap-6'>
//                 <img onClick={() => setShowSearch(!showSearch)} src={assets.search_icon} className='w-5 cursor-pointer' />

//                 <div className='group relative'>
//                     <Link to='/login'  ><img src={assets.profile_icon} className='w-5 cursor-pointer' /></Link>

//                     <div className='group-hover:block hidden absolute dropdown-menu  right-0 pt-4 '> {/*  right-0 => left me show ho */}

//                         <div className='flex flex-col gap-2  w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
//                             <p className='cursor-pointer hover:text-black'>MY Profile</p>
//                             <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
//                             <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>

//                         </div>

//                     </div>
//                 </div>

//                 <Link to='/cart' className='relative'>
//                     <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
//                     {/*  right-[-5px] means right me 5px  */}
//                     <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white  aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
//                 </Link>

//                 {/* this is for small screens okey */}
//                 <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden ' alt="" />

//             </div>


//             {/* SLIDER MENU FOR SMALL SCREENS OKEY  */}

//             <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transistion-all ${visible ? 'w-full' : 'w-0'}`} >
//                 <div className='flex flex-col text-gray--600'>
//                     <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 '>
//                         <img className='h-4 rotate-180 cursor-pointer' src={assets.dropdown_icon} alt="" />
//                         <p className='cursor-pointer'>Back</p>

//                     </div>

//                     <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/'>Home</NavLink>
//                     <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/collection'>Collection</NavLink>
//                     <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/about'>About</NavLink>
//                     <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/contact'>Contact</NavLink>


//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Navbar


import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    showSearch,
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `relative transition duration-300 hover:text-white ${
      isActive ? "text-white" : "text-gray-300"
    }`;

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="flex h-20 items-center justify-between">

            {/* Logo */}

            <Link to="/">
              <h1 className="text-4xl font-black tracking-[6px] text-white">
                AKS
              </h1>
            </Link>

            {/* Desktop Menu */}

            <nav className="hidden lg:flex items-center gap-10">

              <NavLink to="/" className={navClass}>
                Home
              </NavLink>

              <NavLink to="/collection" className={navClass}>
                Collection
              </NavLink>

              <NavLink to="/about" className={navClass}>
                About
              </NavLink>

              <NavLink to="/contact" className={navClass}>
                Contact
              </NavLink>

            </nav>

            {/* Right */}

            <div className="flex items-center gap-6">

              <motion.img
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                src={assets.search_icon}
                onClick={() => setShowSearch(!showSearch)}
                className="w-5 cursor-pointer invert"
                alt=""
              />

              <div className="relative group">

                <img
                  src={assets.profile_icon}
                  className="w-5 cursor-pointer invert"
                  alt=""
                />

                <div className="absolute hidden group-hover:block right-0 pt-5">

                  <div className="rounded-3xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden min-w-[190px]">

                    {token ? (
                      <>
                        <button className="w-full text-left px-6 py-4 hover:bg-white hover:text-black transition">
                          My Profile
                        </button>

                        <button
                          onClick={() => navigate("/orders")}
                          className="w-full text-left px-6 py-4 hover:bg-white hover:text-black transition"
                        >
                          Orders
                        </button>

                        <button
                          onClick={logout}
                          className="w-full text-left px-6 py-4 hover:bg-red-500 transition"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full text-left px-6 py-4 hover:bg-white hover:text-black transition"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <Link className="relative" to="/cart">

                <motion.img
                  whileHover={{ scale: 1.15 }}
                  src={assets.cart_icon}
                  className="w-5 invert"
                />

                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-white text-black rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold"
                >
                  {getCartCount()}
                </motion.span>

              </Link>

              <button
                className="hidden lg:block px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
                onClick={() => navigate("/collection")}
              >
                Shop Now
              </button>

              {/* Mobile */}

              <img
                src={assets.menu_icon}
                className="w-6 invert lg:hidden cursor-pointer"
                onClick={() => setVisible(true)}
                alt=""
              />

            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}

      <AnimatePresence>

        {visible && (

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: .4 }}
            className="fixed inset-0 bg-black z-[100]"
          >

            <div className="flex justify-between items-center p-6 border-b border-white/10">

              <h2 className="text-3xl font-bold text-white">
                MENU
              </h2>

              <button
                onClick={() => setVisible(false)}
                className="text-white text-3xl"
              >
                ✕
              </button>

            </div>

            <div className="flex flex-col mt-10 text-2xl">

              <NavLink
                onClick={() => setVisible(false)}
                className="px-8 py-6 border-b border-white/10 text-white"
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                className="px-8 py-6 border-b border-white/10 text-white"
                to="/collection"
              >
                Collection
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                className="px-8 py-6 border-b border-white/10 text-white"
                to="/about"
              >
                About
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                className="px-8 py-6 border-b border-white/10 text-white"
                to="/contact"
              >
                Contact
              </NavLink>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* Spacer */}

      <div className="h-20"></div>

    </>
  );
};

export default Navbar;