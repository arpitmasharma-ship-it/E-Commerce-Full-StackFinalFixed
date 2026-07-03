import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-zinc-950 via-black to-zinc-900 min-h-[92vh] flex items-center mt-6">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full bg-white/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-gray-500/10 blur-[160px]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .4 }}
            className="inline-block px-5 py-2 rounded-full border border-white/20 text-white/80 text-sm tracking-[4px] uppercase backdrop-blur-xl"
          >
            Luxury Collection
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .2 }}
            className="mt-8 text-white font-black leading-none text-6xl lg:text-8xl"
          >
            Wear
            <br />
            Confidence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .8 }}
            className="mt-8 text-gray-300 text-lg leading-8 max-w-xl"
          >
            Discover premium fashion crafted for modern lifestyles.
            Timeless design, luxurious materials, and elegant silhouettes
            made for everyday confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-5 mt-12"
          >

            <button className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-all duration-300 shadow-2xl">
              Shop Collection
            </button>

            <button className="px-10 py-4 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-xl">
              Explore
            </button>

          </motion.div>

          <motion.div
            initial={{ opacity:0,y:40 }}
            animate={{ opacity:1,y:0 }}
            transition={{ delay:1.3 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-xl"
          >

            <div>
              <h2 className="text-3xl font-bold text-white">20K+</h2>
              <p className="text-gray-400 text-sm mt-2">
                Happy Customers
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">450+</h2>
              <p className="text-gray-400 text-sm mt-2">
                Luxury Products
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">4.9★</h2>
              <p className="text-gray-400 text-sm mt-2">
                Customer Rating
              </p>
            </div>

          </motion.div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity:0,scale:.85 }}
          animate={{ opacity:1,scale:1 }}
          transition={{ duration:1 }}
          className="relative flex justify-center"
        >

          <div className="absolute inset-0 rounded-full bg-white/10 blur-[90px]" />

          <motion.img
            whileHover={{ scale:1.05, rotate:-1 }}
            transition={{ duration:.6 }}
            src={assets.hero_img}
            alt="Luxury Fashion"
            className="relative w-full max-w-[620px] drop-shadow-[0_30px_60px_rgba(0,0,0,.6)]"
          />

          {/* Floating Card */}

          <motion.div
            animate={{
              y:[0,-12,0]
            }}
            transition={{
              repeat:Infinity,
              duration:4
            }}
            className="absolute top-12 right-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white shadow-2xl"
          >

            <p className="text-sm uppercase tracking-widest text-gray-300">
              New Arrival
            </p>

            <h3 className="text-2xl font-bold mt-2">
              Winter 2026
            </h3>

            <p className="text-gray-300 mt-2 text-sm">
              Premium Collection
            </p>

          </motion.div>

          {/* Bottom Card */}

          <motion.div
            animate={{
              y:[0,12,0]
            }}
            transition={{
              repeat:Infinity,
              duration:5
            }}
            className="absolute bottom-12 left-0 rounded-3xl border border-white/20 bg-black/50 backdrop-blur-xl px-8 py-5 text-white"
          >

            <p className="text-sm text-gray-400">
              Starting From
            </p>

            <h2 className="text-3xl font-bold">
              ₹1,999
            </h2>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;