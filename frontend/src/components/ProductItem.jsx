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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group"
    >
      <Link
        to={`/product/${id}`}
        className="
        block
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-500
        "
      >
        {/* IMAGE */}

        <div className="relative bg-zinc-100 overflow-hidden rounded-t-3xl">

          <motion.img
            src={image[0]}
            alt={name}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="
              w-full
              h-56
              sm:h-64
              md:h-72
              object-contain
              p-3
              transition-all
              duration-700
            "
          />

          {/* NEW Badge */}

          <div className="
          absolute
          top-3
          left-3
          px-4
          py-2
          rounded-full
          bg-white/90
          backdrop-blur-xl
          shadow-lg
          text-[11px]
          font-bold
          tracking-[3px]
          ">

            NEW

          </div>

          {/* Quick View */}

          <div className="
          absolute
          bottom-0
          left-0
          w-full
          translate-y-full
          group-hover:translate-y-0
          transition-all
          duration-500
          ">

            <button
              className="
              w-full
              bg-black/90
              backdrop-blur-xl
              py-3
              text-white
              text-xs
              uppercase
              tracking-[3px]
              "
            >
              Quick View
            </button>

          </div>

        </div>

        {/* CONTENT */}

        <div className="p-4">

          <h3
            className="
            text-sm
            sm:text-base
            font-semibold
            text-zinc-900
            line-clamp-2
            min-h-[48px]
            "
          >
            {name}
          </h3>

          <div className="mt-3 flex items-center justify-between">

            <div>

              <p className="text-xl font-bold text-black">

                {currency}
                {price}

              </p>

              <p className="text-xs text-gray-400 mt-1">
                Free Shipping
              </p>

            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{
                rotate: 90,
                scale: 1.05,
              }}
              className="
              h-10
              w-10
              rounded-full
              bg-black
              text-white
              text-xl
              shadow-lg
              "
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