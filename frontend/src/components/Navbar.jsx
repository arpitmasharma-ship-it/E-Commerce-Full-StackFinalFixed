
import { assets } from '../assets/assets'  /* 👉 Images/icons (logo, cart, menu etc.) */
import { Link, useNavigate, NavLink } from 'react-router-dom' /* ✅ Link  👉 Page reload ke bina navigation  && ✅ NavLink 👉 Special link (active state detect karta hai)*/
import { useState, useContext } from 'react' /*  ✅ useContext 👉 Global data access (cart count, search etc.) */
/* ✅ ShopContext 👉 Global data  store (cart, search) */
import React from 'react'
import { ShopContext } from '../context/ShopContext'
const Navbar = () => {

    const navigate = useNavigate();
    /* MY mistake is ki mena return ke ander usestate bana diya tha isliye waha error aa raha tha okey   */
    const [visible, setVisible] = useState(false);
    const { search, setSearch, showSearch, setShowSearch, getCartCount, setToken, token, setCartItems } = useContext(ShopContext);


    
    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})

    }









    return (

        <div className='flex items-center justify-between py-5 font-medium '  >

            <Link to="/"><h2 className='text-4xl font-semibold text-gray-300 hover:text-black ' >Aks</h2></Link>

            <ul className='hidden sm:flex gap-5 text-sm  text-gray-700'>

                <NavLink to='/' className='flex flex-col items-center gap-1 '>
                    <p>Home</p>
                    <hr className='w-[50px] border-none h-[1.5px] bg-gray-700 hidden' />  {/* IT IS GIVING US AN UNDERLINE  */}
                </NavLink>

                <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
                    <p>Collection</p>
                    <hr className='w-[50px] border-none h-[1.5px] bg-gray-700 hidden ' />
                </NavLink>


                <NavLink to='/about' className='flex flex-col items-center gap-1 '>
                    <p>About</p>
                    <hr className='w-[50px] border-none h-[1.5px] bg-gray-700 hidden ' />
                </NavLink>


                <NavLink to='/contact' className='flex flex-col items-center gap-1 '>
                    <p>Contact</p>
                    <hr className='w-[50px] border-none h-[1.5px] bg-gray-700 hidden ' />
                </NavLink>


            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(!showSearch)} src={assets.search_icon} className='w-5 cursor-pointer' />

                <div className='group relative'>
                    <Link to='/login'  ><img src={assets.profile_icon} className='w-5 cursor-pointer' /></Link>

                    <div className='group-hover:block hidden absolute dropdown-menu  right-0 pt-4 '> {/*  right-0 => left me show ho */}

                        <div className='flex flex-col gap-2  w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
                            <p className='cursor-pointer hover:text-black'>MY Profile</p>
                            <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>

                        </div>

                    </div>
                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    {/*  right-[-5px] means right me 5px  */}
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white  aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>

                {/* this is for small screens okey */}
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden ' alt="" />

            </div>


            {/* SLIDER MENU FOR SMALL SCREENS OKEY  */}

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transistion-all ${visible ? 'w-full' : 'w-0'}`} >
                <div className='flex flex-col text-gray--600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 '>
                        <img className='h-4 rotate-180 cursor-pointer' src={assets.dropdown_icon} alt="" />
                        <p className='cursor-pointer'>Back</p>

                    </div>

                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/'>Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/collection'>Collection</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/about'>About</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/contact'>Contact</NavLink>


                </div>
            </div>

        </div>
    )
}

export default Navbar
