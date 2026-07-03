// import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom';

// const ProductItem = ({id,image,name,price}) => {

//     const {currency} = useContext(ShopContext) ;


//   return (
//     <Link  className='text-gray-700 cursor-pointer  '    to={`/product/${id}`} /* 👉 Click → product page open */ >    
//         <div className='overflow-hidden'>
//             <img  className='hover:scale-95 transition ease-in-out' src={image[0]}  />

//         </div>
//         <p className='pt-3 pb-1 text-sm' >{name}</p>
//         <p className='text-sm font-medium '>{currency}{price}</p>
         
      
//     </Link>
//   )
// }

// export default ProductItem


import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.35 }}
      className="group"
    >
      <Link
        to={`/product/${id}`}
        className="block overflow-hidden rounded-[28px] bg-white shadow-sm hover:shadow-2xl transition-all duration-500"
      >
        {/* Image */}

        <div className="relative overflow-hidden bg-zinc-100">

          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: .6 }}
            src={image[0]}
            alt={name}
            className="w-full h-[340px] object-cover"
          />

          {/* Badge */}

          <span className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl text-xs font-semibold tracking-widest">
            NEW
          </span>

          {/* Quick View */}

          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition duration-500">

            <button
              className="w-full bg-black text-white py-4 tracking-widest uppercase text-sm hover:bg-zinc-800 transition"
            >
              Quick View
            </button>

          </div>

        </div>

        {/* Content */}

        <div className="p-6">

          <h3 className="font-semibold text-lg text-zinc-900 line-clamp-1">
            {name}
          </h3>

          <div className="flex items-center justify-between mt-4">

            <p className="text-2xl font-bold">
              {currency}
              {price}
            </p>

            <motion.button
              whileTap={{ scale: .9 }}
              whileHover={{ rotate: 90 }}
              className="w-12 h-12 rounded-full bg-black text-white text-xl"
            >
              +
            </motion.button>

          </div>

        </div>
      </Link>
    </motion.div>
  );
};

export default ProductItem;