// import React, { useContext, useEffect,useState } from 'react'

// import { ShopContext } from '../context/ShopContext'
// import Title from './Title';
// import ProductItem from './ProductItem';

// const LatestCollection = () => {

//     const { products } = useContext(ShopContext); ////// yeha products ko directly bhi access ker saktha the 
//     // console.log(products)
//     const [latestProducts, setLatestProducts] = useState([]);

//     useEffect(() => {
//         setLatestProducts(products.slice(0, 10));
//     },[products])
//     return (
//         <div className='my-10'>
//             <div className='text-center py-8 text-3xl' >
//                 <Title text1={'Latest'} text2={'Collection'} />
//                 <p className='w-3/4 m-auto text-xs sm:text-sm  md:text-base text-gray-600'  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ut neque repellat nihil asperiores aliquid?</p>
//             </div>

//             {/* to dispplay the product data  */}

//             {/* Rendering Products  */}
//             <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'  >

//                 {
//                     latestProducts.map((item ,index)=>(
//                         <ProductItem key={index} id={item._id}  image={item.image}  name={item.name} price={item.price} />
//                     ))
//                 }

//             </div>


//         </div>

//     )
// }

// export default LatestCollection

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  return (
<section className="pt-8 pb-10">

      {/* Heading */}

      <div className="text-center mb-10 sm:mb-14">

        <Title text1="Premium" text2="Latest Collection" />

        <p className="mt-4 max-w-2xl mx-auto px-4 text-gray-500 text-sm sm:text-base leading-7">
          Discover our newest premium arrivals crafted with exceptional quality,
          timeless style and unmatched comfort.
        </p>

      </div>

      {/* Products */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-4
          gap-3
          sm:gap-5
          lg:gap-7
        "
      >
        {products.slice(0, 8).map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08,
              duration: 0.5,
            }}
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
};

export default LatestCollection;