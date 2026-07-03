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
    desc: "Enjoy a hassle-free exchange process with fast replacements and zero hidden charges.",
  },
  {
    icon: assets.quality_icon,
    title: "Premium Quality",
    desc: "Every product is carefully crafted using premium materials for exceptional comfort.",
  },
  {
    icon: assets.support_img,
    title: "24/7 Support",
    desc: "Our support team is always available to help you before and after every purchase.",
  },
];

const OurPolicy = () => {
  return (
    <section className="py-28">

      <div className="text-center mb-16">

        <span className="uppercase tracking-[6px] text-gray-400 text-sm">
          Why Choose Us
        </span>

        <h2 className="text-5xl font-black mt-4 text-zinc-900">
          Premium Shopping Experience
        </h2>

        <p className="mt-5 max-w-2xl mx-auto text-gray-500 leading-8">
          We focus on quality, trust and customer satisfaction to provide
          a world-class shopping experience.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {policies.map((item, index) => (

          <motion.div
            key={index}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{
              duration: 0.35,
            }}
            className="group relative overflow-hidden rounded-[32px] bg-white border border-gray-200 shadow-lg hover:shadow-2xl p-10"
          >

            {/* Background Glow */}

            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-black/5 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />

            <div className="relative">

              <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-zinc-100 mb-8 mx-auto group-hover:bg-black transition duration-500">

                <img
                  src={item.icon}
                  alt=""
                  className="w-10 transition duration-500 group-hover:invert"
                />

              </div>

              <h3 className="text-2xl font-bold text-center mb-4">
                {item.title}
              </h3>

              <p className="text-center text-gray-500 leading-7">
                {item.desc}
              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
};

export default OurPolicy;