import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom';/* 👉 Yeh bahut important hai Isse pata chalega: 👉 user abhi kaunse page pe hai */
import Contact from '../pages/Contact';

const SearchBar = () => {


    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // console.log(location.pathname)

        /* location.pathname.includes('collection')  → kya URL me "collection" hai?
showSearch   → kya user ne search ON kiya hai?
👉 Dono true honge tab: 👉 search bar dikhega */
        if (location.pathname.includes('collection') && showSearch) { //// this is important okey 
            setVisible(true);
        }
        else {
            setVisible(false);
        }

    }, [location])

    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-50  text-center   '     >

            <div className='inline-flex items-center gap-5 justify-center border  border-gray-400 px-5  py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '  >
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1  outline-none  bg-inherit   text-sm ' type="text" placeholder='Search ' />
                <img className='w-4 cursor-pointer' src={assets.search_icon} alt="" />

                <img onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
            </div>

        </div>
    ) : null
}

export default SearchBar
