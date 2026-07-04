// /* React → JSX use karne ke liye required hai
// useState → local state banane ke liye
// useEffect → side effects (jaise API ke baad ka kaam, filtering, etc.)
// useContext → global data access (ShopContext se) */
// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// /* Title → heading component (Best Seller etc.)
// ProductItem → ek single product ka UI card */
// import Title from './Title';
// import ProductItem from './ProductItem';


// const BestSeller = () => {

//     const { products } = useContext(ShopContext); ///ShopContext se products le rahe hai
//     const [bestSeller, setBestSeller] = useState([]);  /* bestSeller → data store karega  setBestSeller → update karega */

//     useEffect(() => {    /////// Ye tab chalega jab products change hoga

//         const bestProduct = products.filter((item) => (item.bestseller)); //// .filter() array ko filter karta hai
//         setBestSeller(bestProduct.slice(0, 5));  //// .slice(0,5) → first 5 items

//     }, [products])  //// Jab bhi products change hoga → effect run hoga


//     return (



//         <div className='my-10'>
//             <div className='text-center py-8 text-3xl' >
//             <Title text1={'Best'} text2={'Seller'}/>
//             <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, error.</p>
//             </div>

//             <div className='grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//                 {/* NOw to display elements okey  */}

//                 {
//                  bestSeller.map((item,index)=>(
//                    < ProductItem key={index}  id={item._id}  image={item.image}  name={item.name} price={item.price}   />
//                  ))   
//                 }
//             </div>



//         </div>



//     )
// }

// export default BestSeller


import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const BestSeller = () => {

  const { products } = useContext(ShopContext);

  const best = products.filter((p)=>p.bestseller).slice(0,8);

  return (

    <section className="pt-8 pb-12">

      <Title text1="Most Loved" text2="Best Sellers"/>

     <div className="
grid
grid-cols-2
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
gap-4
sm:gap-6
lg:gap-8
">

        {best.map((item)=>(
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

export default BestSeller;