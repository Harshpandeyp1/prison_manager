import React, { useState } from "react";
import india from "../images/india.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
 
  const navigate = useNavigate();

  // 🔹 Form state
  const [form, setForm] = useState({ adminId: "", password: "" });

  // 🔹 Show / Hide password state
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 🔹 Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.adminId || !form.password) {
      alert("All fields are required");
      return;
    }

    const adminCredentials = {
      adminId: "admin123",
      password: "admin@123",
    };

    if (
      form.adminId === adminCredentials.adminId &&
      form.password === adminCredentials.password
    ) {
      alert("Login Successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid Admin ID or Password");
    }
  };

  // 🔹 Forgot password function
  const handleForgotPassword = () => {
    if (!form.adminId) {
      alert("Please enter your Admin ID first");
      return;
    }

    alert(
      `Password recovery request initiated for Admin ID: ${form.adminId}`
    );

    // Later you can connect this to backend / email service
  };

  return (
    <div className="bg-slate-950 min-h-screen">
       <nav className="bg-slate-950 text-white flex items-center justify-center h-18 text-3xl">
              <img src={india} alt="Police Badge" className="p-1.5 h-14 mr-2" />
              Department of Corrections | Central Registry
      
              <div className="flex space-x-2 pl-4 items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[15px] text-slate-500 font-bold uppercase">
                  Server Online
                </span>
              </div>
            </nav>
    
     
            
      {/* CENTER FORM */}
     <div className="flex justify-center items-start pt-24 min-h-[calc(100vh-3.5rem)]">

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl overflow-hidden font-mono
             shadow-[0_6px_20px_-6px_rgba(37,99,235,0.6)]">

          <div className="h-1 w-full bg-blue-500" />

          <div className="p-10">
            <div className="text-center mb-10">
              <h1 className="text-white text-3xl font-black tracking-widest uppercase">
                Prison <span className="text-blue-500">Manager</span>
              </h1>
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">
                Secure Administrative Terminal
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Admin ID */}
              <div>
                <label className="text-slate-500 text-[10px] font-bold uppercase ml-1 mb-2 block">
                  Badge ID / Personnel No.
                </label>
                <input
                  type="text"
                  name="adminId"
                  value={form.adminId}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 rounded-lg overflow-hidden font-mono
             shadow-[0_6px_20px_-6px_rgba(37,99,235,0.6)]"
                  placeholder="ID-000000"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-slate-600 text-[10px] font-bold uppercase ml-1 mb-2 block">
                  Access Passcode
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 rounded-lg pr-12 overflow-hidden font-mono
             shadow-[0_6px_20px_-6px_rgba(37,99,235,0.6)]"
                    placeholder="••••••••"
                  />

                  {/* Show / Hide Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs uppercase"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Forgot password */}
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-blue-500 text-[10px] uppercase tracking-widest hover:text-blue-400"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-900 text-white font-bold py-4 rounded-lg mt-4 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3 border border-blue-950 "
              >
                <lord-icon
                  src="https://cdn.lordicon.com/urswgamh.json"
                  trigger="hover"
                  colors="primary:#1b1091,secondary:#ffffff"
                  style={{ width: "40px", height: "40px" }}
                />
                Request Authorization
              </button>
            </form>
          </div>

          <div className="mt-8 text-center w-full">
            <p className="text-red-900/60 text-[12px] font-bold uppercase leading-relaxed tracking-widest border border-red-900/20 p-2 rounded">
              Warning: Unauthorized access to this system is prohibited by 18
              U.S.C. § 1030. All activities are logged and monitored.
            </p>

            <div className="mt-4 flex justify-center items-center space-x-4 text-slate-600 font-mono text-[10px]">
              <span>IP_NODE: 172.20.10.4</span>
              <span>LOC: SECTOR_G</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
