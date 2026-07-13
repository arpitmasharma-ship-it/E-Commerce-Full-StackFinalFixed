import React from "react";
import { LogOut, Bell, Search } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = ({ setToken }) => {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200"
    >
      <div className="flex items-center justify-between px-8 py-4">

        {/* Logo */}

        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              AS
            </span>
            <span className="text-gray-800">Prime</span>
          </h1>

          <p className="text-xs text-gray-500 tracking-[5px] uppercase">
            Admin Dashboard
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100">

            <Search size={18} />

            <input
              placeholder="Search..."
              className="bg-transparent outline-none"
            />

          </div>

          <button className="relative p-3 rounded-xl bg-gray-100 hover:bg-indigo-100 duration-300">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          <div className="hidden md:flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold">
              A
            </div>

            <div>
              <h3 className="font-semibold">Admin</h3>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>

          </div>

          <button
            onClick={() => setToken("")}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl shadow-lg hover:scale-105 duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default Navbar;