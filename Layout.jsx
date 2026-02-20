import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 p-4">
      {/* Outer dark frame */}

      <div className="min-h-[calc(100vh-2rem)] border border-slate-800 bg-slate-900 overflow-hidden">
        {/* Inner lighter frame */}

        <Navbar />


        <div className="p-6">
          {children}
        </div>
      </div>
  
    </div>
  );
};

export default Layout;
