// import React from 'react'
// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <div className='flex flex-col sm:grid  grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
//         <div>
//             <img src={assets.logo} className='w-32 mb-5 ' alt="" />
//             <p className='w-full md:w-2/3 text-gray-600'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos aspernatur quia iusto accusamus possimus at, doloremque necessitatibus saepe aut in.</p>
//         </div>

//         <div>
//             <p className='text-xl font-medium mb-5'>Company</p>
//             <ul className='flex flex-col gap-1 text-gray-600'>
//                 <li>Home</li>
//                 <li>About US</li>
//                 <li>Delivery</li>
//                 <li>Privacy Policy</li>


//             </ul>
//         </div>

//         <div>
//             <p className='text-xl font-medium mb-5'>Get In Touch</p>
//             <ul className='flex flex-col gap-1 text-gray-600'>
//                 <li>+91 9784839250</li>
//                 <li>ArpitGOAT@gmail.com</li>

//             </ul>
//         </div>

//         <div >
//             <hr />
//             <p className='py-5 text-sm text-center'>Copyright 2024@ ArpitLimitesPrivate</p>
//         </div>
      
//     </div>
//   )
// }

// export default Footer


import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Footer = () => {
  return (
<footer className="mt-16 rounded-[32px] overflow-hidden bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand */}

          <div className="lg:col-span-2">
                 
             

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
            
            <p className="mt-5 text-sm text-zinc-400 leading-7 max-w-md" >
              Elevating everyday fashion through timeless silhouettes,
              premium fabrics, and exceptional craftsmanship.
              Designed for people who appreciate luxury and simplicity.
            </p>

            <div  className="flex flex-wrap gap-3 mt-6" >

              {["Instagram", "Twitter", "Pinterest"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ y: -6 }}
               className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white hover:text-black transition"
                >
                  {item}
                </motion.button>
              ))}

            </div>

          </div>

        {/* Company + Contact */}

<div className="lg:col-span-2">

  <div className="grid grid-cols-2 gap-8">

    {/* Company */}

    <div>

      <h3 className="text-lg font-bold mb-4">
        Company
      </h3>

      <ul className="space-y-3 text-sm text-zinc-400">

        <li className="hover:text-white transition cursor-pointer">
          Home
        </li>

        <li className="hover:text-white transition cursor-pointer">
          Collection
        </li>

        <li className="hover:text-white transition cursor-pointer">
          About
        </li>

        <li className="hover:text-white transition cursor-pointer">
          Contact
        </li>

      </ul>

    </div>

    {/* Contact */}

    <div>

      <h3 className="text-lg font-bold mb-4">
        Contact
      </h3>

      <ul className="space-y-3 text-sm text-zinc-400">

        <li>+91 9784839250</li>

        <li>arpitGOAT@gmail.com</li>

        <li>Jaipur, Rajasthan</li>

      </ul>

    </div>

  </div>

</div>

        </div>

       <div className="border-t border-white/10 mt-10 pt-5 flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="text-xs sm:text-sm text-zinc-500" >
            © 2026 AKS Luxury. All rights reserved.
          </p>

          <div className="flex gap-5 text-xs sm:text-sm text-zinc-500" >

            <span className="hover:text-white cursor-pointer transition">
              Privacy
            </span>

            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>

            <span className="hover:text-white cursor-pointer transition">
              Cookies
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
