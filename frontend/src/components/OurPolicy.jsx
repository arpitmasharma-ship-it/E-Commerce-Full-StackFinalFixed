// import React from 'react'
// import { assets } from '../assets/assets'

// const OurPolicy = () => {
//   return (
//     <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm  md:text-base text-gray-700 '>
//       <div className=''>
//         <img className='w-12 m-auto mb-5' src={assets.exchange_icon} alt="" />
//         <p className='font-semibold'>Easy Exchange Policy</p>
//         <p className='text-gray-400'>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
//       </div>


//        <div className=''>
//         <img className='w-12 m-auto mb-5' src={assets.quality_icon} alt="" />
//         <p className='font-semibold'>7 Days Return Policy </p>
//         <p className='text-gray-400'>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
//       </div>



//        <div className=''>
//         <img className='w-12 m-auto mb-5' src={assets.support_img} alt="" />
//         <p className='font-semibold'>Easy Support </p>
//         <p className='text-gray-400'>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
//       </div>




//     </div>
//   )
// }

// export default OurPolicy


import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const policies = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange",
    desc: "Fast and hassle-free exchanges.",
  },
  {
    icon: assets.quality_icon,
    title: "Premium Quality",
    desc: "Crafted with premium materials.",
  },
  {
    icon: assets.support_img,
    title: "24/7 Support",
    desc: "Always here whenever you need us.",
  },
];

const OurPolicy = () => {
  return (
    <section className="py-12 sm:py-16">

      {/* Heading */}

      <div className="text-center mb-8">

        <p className="uppercase tracking-[5px] text-xs text-gray-400">
          Why Choose Us
        </p>

        <h2 className="mt-2 text-3xl sm:text-4xl font-black text-zinc-900">
          Premium Shopping
        </h2>

        <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-gray-500">
          Luxury shopping with quality products and trusted service.
        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {policies.map((item, index) => (

          <motion.div
            key={index}
            whileHover={{
              y: -8,
            }}
            transition={{
              duration: 0.3,
            }}
            className="rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl p-6"
          >

            <div className="flex justify-center">

              <div className="h-14 w-14 rounded-2xl bg-zinc-100 flex items-center justify-center">

                <img
                  src={item.icon}
                  alt=""
                  className="w-7"
                />

              </div>

            </div>

            <h3 className="text-lg font-bold text-center mt-5">
              {item.title}
            </h3>

            <p className="text-center text-sm text-gray-500 mt-2 leading-6">
              {item.desc}
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
};

export default OurPolicy;