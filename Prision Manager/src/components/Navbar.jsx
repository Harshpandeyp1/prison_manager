import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import india from "../images/india.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

 const menuItems = [
  { name: "DashBoard", path: "/dashboard" },
  { name: "Inmates", path: "/inmates" },
  { name: "Staff", path: "/staff" },
  { name: "Logs", path: "/logs" },
  { name: "Facilities", path: "/Facilities" },  // Capital F matches route
  { name: "Pulse", path: "/pulse" },           // Lowercase /pulse
];
  return (
    <div className="bg-slate-950">
      {/* TOP BAR */}
      <div className="flex items-center justify-between bg-slate-900 backdrop-blur-md p-4 text-white pt-2.5">
        <div className="flex items-center gap-3">
          <img src={india} alt="Police Badge" className="p-1.5 h-14 mr-2" />
          <span className="font-bold font-serif text-2xl">
            Department of Central Registry
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
          Admin : Warden
        </div>
      </div>

      {/* MENU */}
      <ul className="flex gap-1 text-slate-400 text-xl font-bold uppercase tracking-widest">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li
              key={item.name}
              onClick={() => item.path !== "#" && navigate(item.path)}
              className={`
                cursor-pointer px-8 py-5 transition-all duration-200 rounded-md
                hover:text-white hover:shadow-[0_0_10px_rgba(37,99,235,0.4)]
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:text-blue-300 hover:border-b-2 hover:border-blue-300"
                }
              `}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
