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
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  return (
    <section className="py-24">

      <Title text1="Premium" text2="Latest Collection" />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

        {products.slice(0,8).map((item)=>(
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}

      </div>

    </section>
  );
};

export default LatestCollection;