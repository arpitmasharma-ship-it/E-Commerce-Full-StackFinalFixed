// import React from 'react'

// const Title = ({text1 , text2}) => {
//   return (
//     <div className='inline-flex gap-2 items-center mb-3' >
//         <p className='text-gray-500 '>{text1} <span className='text-gray-700 font-medium '>{text2}</span> </p>
//         <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700' ></p>
        
//     </div>
//   )
// }

// export default Title


import React from "react";
import { motion } from "framer-motion";

const Title = ({ text1, text2 }) => {
  return (
    <motion.div
      initial={{ opacity:0,y:40 }}
      whileInView={{ opacity:1,y:0 }}
      viewport={{ once:true }}
      transition={{ duration:.7 }}
      className="text-center mb-16"
    >
      <p className="uppercase tracking-[8px] text-gray-400 text-sm mb-3">
        {text1}
      </p>

      <h2 className="text-5xl md:text-6xl font-black text-zinc-900">
        {text2}
      </h2>

      <div className="w-24 h-1 bg-black mx-auto mt-6 rounded-full"></div>
    </motion.div>
  );
};

export default Title;