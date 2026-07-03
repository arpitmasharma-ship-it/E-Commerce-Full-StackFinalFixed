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
    <footer className="mt-32 rounded-[40px] overflow-hidden bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-4 gap-16">

          {/* Brand */}

          <div className="lg:col-span-2">

            <motion.img
              whileHover={{ scale: 1.05 }}
              src={assets.logo}
              className="w-36 invert"
              alt=""
            />

            <p className="mt-8 text-zinc-400 leading-8 max-w-lg">
              Elevating everyday fashion through timeless silhouettes,
              premium fabrics, and exceptional craftsmanship.
              Designed for people who appreciate luxury and simplicity.
            </p>

            <div className="flex gap-4 mt-10">

              {["Instagram", "Twitter", "Pinterest"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ y: -6 }}
                  className="rounded-full border border-white/10 px-5 py-3 hover:bg-white hover:text-black transition"
                >
                  {item}
                </motion.button>
              ))}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-bold mb-8">
              Company
            </h3>

            <ul className="space-y-5 text-zinc-400">

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

            <h3 className="text-xl font-bold mb-8">
              Contact
            </h3>

            <ul className="space-y-5 text-zinc-400">

              <li>+91 9784839250</li>

              <li>arpitgoat@gmail.com</li>

              <li>Jaipur, Rajasthan</li>

            </ul>

          </div>

        </div>

        <div className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-zinc-500">
            © 2026 AKS Luxury. All rights reserved.
          </p>

          <div className="flex gap-8 mt-6 md:mt-0 text-zinc-500">

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
