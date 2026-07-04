
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


import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    getCartCount,
    token,
    setToken,
    setCartItems,
    showSearch,
    setShowSearch,
  } = useContext(ShopContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
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

  const links = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-500
        ${
          scrolled
            ? "backdrop-blur-2xl bg-white/70 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

          <Link to="/">
                  <h1
  className="
    text-4xl md:text-5xl
    font-extrabold
    tracking-tight
    bg-gradient-to-r
    from-yellow-300
    via-yellow-500
    to-amber-300
    bg-clip-text
    text-transparent
    drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]
    hover:scale-105
    transition-all
    duration-500
    cursor-pointer
    animate-pulse
  "
>
  <span className="font-black">AS</span>
  <span className="text-white">Prime</span>
</h1>
          </Link>

          <ul className="hidden lg:flex gap-10 font-medium">

            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative transition ${
                    isActive ? "text-black" : "text-gray-500"
                  } hover:text-black`
                }
              >
                {item.name}

                <span className="absolute left-0 -bottom-2 h-[2px] bg-black w-0 hover:w-full transition-all duration-300"></span>

              </NavLink>
            ))}
          </ul>

          <div className="flex items-center gap-5">

            <img
              src={assets.search_icon}
              onClick={() => setShowSearch(!showSearch)}
              className="w-5 cursor-pointer hover:scale-110 transition"
            />

            <div className="relative group">

              <img
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
              />

              <div className="absolute hidden group-hover:block right-0 pt-4">

                <div className="rounded-3xl bg-white shadow-2xl p-5 w-52">

                  {!token ? (
                    <p
                      onClick={() => navigate("/login")}
                      className="cursor-pointer hover:text-black text-gray-500"
                    >
                      Login
                    </p>
                  ) : (
                    <>
                      <p className="cursor-pointer hover:text-black text-gray-500">
                        My Profile
                      </p>

                      <p
                        onClick={() => navigate("/orders")}
                        className="mt-3 cursor-pointer hover:text-black text-gray-500"
                      >
                        Orders
                      </p>

                      <p
                        onClick={logout}
                        className="mt-3 cursor-pointer hover:text-black text-gray-500"
                      >
                        Logout
                      </p>
                    </>
                  )}

                </div>

              </div>

            </div>

            <Link to="/cart" className="relative">

              <img
                src={assets.cart_icon}
                className="w-5"
              />

              <span className="absolute -right-2 -bottom-2 h-5 w-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
                {getCartCount()}
              </span>

            </Link>

            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <img
                src={assets.menu_icon}
                className="w-6"
              />
            </button>

          </div>

        </div>
      </motion.nav>

      <AnimatePresence>

        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 bg-black text-white z-[100]"
          >

            <div className="flex justify-between items-center p-7">

              <h2 className="text-3xl font-bold">
                Menu
              </h2>

              <button onClick={() => setMenuOpen(false)}>
                ✕
              </button>

            </div>

            <div className="flex flex-col mt-10">

              {links.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-bold px-8 py-6 border-b border-white/10"
                >
                  {item.name}
                </NavLink>
              ))}

            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
};

export default Navbar;