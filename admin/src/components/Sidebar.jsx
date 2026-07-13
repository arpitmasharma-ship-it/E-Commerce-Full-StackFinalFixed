import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  ShoppingBag,
  Package,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    },
    {
      name: "Add Product",
      icon: <PlusCircle size={20} />,
      path: "/add",
    },
    {
      name: "Products",
      icon: <ShoppingBag size={20} />,
      path: "/list",
    },
    {
      name: "Orders",
      icon: <Package size={20} />,
      path: "/order",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "#",
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-white border-r border-gray-200 shadow-sm">

      <div className="p-6">

        <p className="text-gray-400 uppercase text-xs tracking-[4px] mb-6">
          Navigation
        </p>

        <div className="flex flex-col gap-3">

          {menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "hover:bg-indigo-50 text-gray-600"
                }`
              }
            >
              {item.icon}

              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Sidebar;