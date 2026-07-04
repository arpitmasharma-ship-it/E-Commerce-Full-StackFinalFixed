import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Hero = () => {
  return (
   <section className="relative overflow-hidden rounded-[30px] bg-[#050505] mt-3 py-8 sm:py-10 lg:py-14 mb-8">

      {/* ================= Aurora Background ================= */}

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut",
        }}
        className="absolute -left-44 -top-44 h-[650px] w-[650px] rounded-full bg-cyan-500/10 blur-[180px]"
      />

      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -70, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
        className="absolute right-[-250px] top-20 h-[650px] w-[650px] rounded-full bg-purple-500/10 blur-[180px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 14,
        }}
        className="absolute bottom-[-220px] left-1/3 h-[600px] w-[600px] rounded-full bg-pink-500/10 blur-[180px]"
      />

      {/* Grid */}

      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* Noise */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle,#fff 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 grid grid-cols-2 items-center gap-5 lg:gap-14">

        {/* ================= LEFT ================= */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          {/* Badge */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .3 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2 sm:px-5 sm:py-3"
          >

            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

            <span className="uppercase tracking-[2px] sm:tracking-[4px] text-[10px] sm:text-xs text-gray-300">

              Luxury Collection 2026

            </span>

          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .2 }}
            className="mt-5 font-black leading-[0.9] tracking-tight text-white text-[38px] sm:text-[55px] md:text-[72px] lg:text-[110px]"
          >

            WEAR

            <br />

            LUXURY

          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .7 }}
            className="mt-4 max-w-sm text-[13px] sm:text-base leading-6 text-gray-400"
          >

            Discover timeless luxury fashion crafted with premium materials,
            elegant silhouettes and unmatched comfort for modern lifestyles.

          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .9 }}
            className="flex flex-col sm:flex-row gap-3 mt-6"
          >

            <button className="rounded-full bg-white px-6 py-3 sm:px-9 sm:py-4 text-sm sm:text-base font-semibold text-black transition duration-300 hover:scale-105">

              Shop Collection →

            </button>

            <button className="rounded-full border border-white/20 bg-white/5 backdrop-blur-xl px-6 py-3 sm:px-9 sm:py-4 text-sm sm:text-base text-white transition duration-300 hover:bg-white hover:text-black">

              Explore

            </button>

          </motion.div>

          {/* Stats */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-8 grid grid-cols-3 gap-2 sm:gap-6"
          >

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                20K+
              </h2>
              <p className="text-[11px] sm:text-sm text-gray-400 mt-1">
                Customers
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                500+
              </h2>
              <p className="text-[11px] sm:text-sm text-gray-400 mt-1">
                Products
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                4.9★
              </h2>
              <p className="text-[11px] sm:text-sm text-gray-400 mt-1">
                Reviews
              </p>
            </div>

          </motion.div>

        </motion.div>

        {/* ================= RIGHT STARTS HERE ================= */}

                {/* ================= RIGHT ================= */}

        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex items-center justify-center mt-10 lg:mt-0"
        >

          {/* Glow */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.75, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[500px] lg:h-[500px] rounded-full bg-white/10 blur-[90px]"
          />

          {/* Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: "linear",
            }}
            className="absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[520px] lg:h-[520px] rounded-full border border-white/10"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 55,
              ease: "linear",
            }}
            className="absolute w-[300px] h-[300px] sm:w-[390px] sm:h-[390px] lg:w-[590px] lg:h-[590px] rounded-full border border-white/5"
          />

          {/* Floating Hero Image */}

<motion.div
  animate={{
    y: [0, -20, 0], // Move up then back down
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  whileHover={{
    scale: 1.05,
    rotate: -2,
  }}
  className="
    relative
    z-20
    p-3
    rounded-[40px]
    border
    border-white/10
    bg-white/5
    backdrop-blur-2xl
    shadow-[0_40px_90px_rgba(0,0,0,.65)]
  "
>
  <img
    src={assets.hero_img}
    alt="Luxury Fashion"
    className="
      rounded-[32px]
      object-cover
      w-[260px]
      sm:w-[340px]
      md:w-[420px]
      lg:w-[500px]
      xl:w-[560px]
    "
  />
</motion.div>
          {/* ---------- TOP CARD ---------- */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="
              absolute
              top-0
              right-0
              sm:top-5
              sm:right-2
              lg:top-10
              lg:right-0
              rounded-2xl
              bg-white/10
              backdrop-blur-2xl
              border border-white/10
              px-3 py-3
              sm:px-5 sm:py-4
              shadow-2xl
            "
          >

            <p className="text-[9px] sm:text-[11px] uppercase tracking-[3px] text-gray-300">
              NEW ARRIVAL
            </p>

            <h3 className="text-sm sm:text-xl font-bold text-white mt-1">
              Winter 2026
            </h3>

            <p className="text-[10px] sm:text-sm text-gray-400 mt-1">
              Premium Collection
            </p>

          </motion.div>

          {/* ---------- PRICE CARD ---------- */}

          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="
              absolute
              left-0
              bottom-3
              sm:left-2
              lg:left-0
              rounded-2xl
              border
              border-white/10
              bg-black/60
              backdrop-blur-xl
              px-4 py-3
              sm:px-6 sm:py-4
            "
          >

            <p className="text-[10px] sm:text-xs text-gray-400">
              Starting From
            </p>

            <h2 className="text-lg sm:text-3xl font-bold text-white mt-1">
              ₹1,999
            </h2>

          </motion.div>

          {/* ---------- RATING ---------- */}

          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
            }}
            className="
              hidden
              md:block
              absolute
              bottom-24
              right-0
              rounded-2xl
              border border-white/10
              bg-white/10
              backdrop-blur-xl
              px-5 py-4
            "
          >

            <p className="text-xs text-gray-400">
              Customer Rating
            </p>

            <h3 className="text-2xl font-bold text-white mt-1">
              ⭐ 4.9
            </h3>

          </motion.div>

          {/* ---------- DISCOUNT ---------- */}

          <motion.div
            animate={{
              x: [0, 8, 0],
              rotate: [0, 4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="
              absolute
              left-0
              top-12
              sm:left-3
              sm:top-16
              rounded-full
              bg-white
              text-black
              font-bold
              text-xs
              sm:text-sm
              px-4
              py-2
              shadow-2xl
            "
          >

            40% OFF

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;