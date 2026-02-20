import React, { useState } from "react";
import Layout from "./Layout";
// Inline Layout component to ensure consistency and prevent resolution errors

const Staff = () => {
  
  const [staff, setStaff] = useState([
  ]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "Guard",
    shift: "Morning",
    status: "Working",
  });

  const addStaff = () => {
    if (!form.name || !form.role) return alert("Please enter the staff name and role.");

    setStaff([
      ...staff,
      { id: Date.now(), ...form },
    ]);

    setForm({ name: "", role: "Guard", shift: "Morning", status: "Working" });
    setShowAdd(false);
  };

  const removeStaff = (id) => {
    if (window.confirm("Are you sure you want to remove this personnel from the directory?")) {
        setStaff(staff.filter(s => s.id !== id));
    }
  };

  const filteredStaff = staff.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-8 text-white  bg-slate-950 mx-auto min-h-screen border border-blue-500 rounded-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 ">
            <div>
                <h1 className="text-4xl font-black tracking-tighter text-white font-serif mb-1 uppercase">Personnel Directory</h1>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-blue-600"></span>
                    Managing Human Resources & Security Details
                </p>
            </div>
            <button
                onClick={() => setShowAdd(true)}
                className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-2xl font-black text-sm tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 flex items-center gap-3"
            >
                <lord-icon src="https://cdn.lordicon.com/vjgknpfx.json" trigger="hover" stroke="bold" colors="primary:#ffffff,secondary:#ffffff" style={{ width: "20px", height: "20px" }} />
                RECRUIT STAFF
            </button>
        </div>

        {/* STAFF OVERVIEW STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 border border-white rounded-3xl p-6 shadow-xl flex flex-col relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">Total Force</p>
            <p className="text-4xl font-black text-white">{staff.length}</p>
            <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-full opacity-50"></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-white rounded-3xl p-6 shadow-xl flex flex-col relative overflow-hidden group">
            <p className="text-green-500/80 text-[10px] uppercase font-black tracking-widest mb-1">Active Duty</p>
            <p className="text-4xl font-black text-green-400">
              {staff.filter(s => s.status === "Working").length}
            </p>
            <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${(staff.filter(s => s.status === "Working").length / staff.length) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-white rounded-3xl p-6 shadow-xl flex flex-col relative overflow-hidden group">
            <p className="text-red-500/80 text-[10px] uppercase font-black tracking-widest mb-1">Standby / Off</p>
            <p className="text-4xl font-black text-red-400">
              {staff.filter(s => s.status !== "Working").length}
            </p>
            <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: `${(staff.filter(s => s.status !== "Working").length / staff.length) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-white rounded-3xl p-6 shadow-xl flex flex-col relative overflow-hidden group">
            <p className="text-purple-500/80 text-[10px] uppercase font-black tracking-widest mb-1">Commanders / Wardens</p>
            <p className="text-4xl font-black text-purple-400">
              {staff.filter(s => s.role.toLowerCase() === "warden").length}
            </p>
            <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: `${(staff.filter(s => s.role.toLowerCase() === "warden").length / staff.length) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-blue-500 rounded-[2.5rem] shadow-2xl p-6 flex flex-col">
            {/* Search Header */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder="Search by name, role or assignment..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 px-12 py-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium text-slate-200"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <i className="fas fa-search"></i>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                    <tr>
                        <th className="p-4">Personnel Details</th>
                        <th className="p-4">Authorization Role</th>
                        <th className="p-4">Active Shift</th>
                        <th className="p-4">Current Status</th>
                        <th className="p-4 text-center">Protocol</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                    {filteredStaff.length === 0 ? (
                        <tr>
                        <td colSpan="5" className="p-20 text-center">
                            <div className="flex flex-col items-center opacity-30">
                                <i className="fas fa-id-badge text-6xl mb-4"></i>
                                <p className="text-xl font-bold uppercase tracking-widest">No matching personnel records</p>
                            </div>
                        </td>
                        </tr>
                    ) : (
                        filteredStaff.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/30 transition-all group">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-black text-slate-400 group-hover:border-blue-500/50 transition-all">
                                        {s.name.charAt(0)}
                                    </div>
                                    <span className="font-bold text-slate-100">{s.name}</span>
                                </div>
                            </td>
                            <td className="p-4 font-mono text-sm text-slate-400">
                                <span className={s.role === 'Warden' ? 'text-purple-400 font-bold' : ''}>
                                    {s.role}
                                </span>
                            </td>
                            <td className="p-4 text-sm text-slate-500 font-bold italic">{s.shift || "Not Assigned"}</td>
                            <td className="p-4">
                            <span
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${
                                s.status === "Working"
                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                                }`}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'Working' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                                {s.status}
                            </span>
                            </td>
                            <td className="p-4 text-center">
                                <button 
                                    onClick={() => removeStaff(s.id)}
                                    className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                    title="Revoke Authorization"
                                >
                                    <i className="fas fa-user-slash"></i>
                                </button>
                            </td>
                        </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Add Staff Modal */}
        {showAdd && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-[200] p-4">
            <div className="bg-slate-900 border border-slate-700 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              
              <h2 className="text-2xl font-black italic tracking-tighter uppercase text-blue-400 mb-6">Recruit Personnel</h2>

              <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Full Name</label>
                    <input
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl outline-none focus:border-blue-500 transition-all text-white"
                        placeholder="e.g. Victor Kaine"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Assigned Role</label>
                    <select
                        className="w-full bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl outline-none focus:border-blue-500 transition-all text-white appearance-none"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="Guard">Security Guard</option>
                        <option value="Warden">Warden / Commander</option>
                        <option value="Medical">Medical Staff</option>
                        <option value="Cook">Catering Detail</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Duty Shift</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            type="button"
                            onClick={() => setForm({...form, shift: 'Morning'})}
                            className={`py-3 rounded-xl font-bold text-xs transition-all ${form.shift === 'Morning' ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-500 border border-slate-800'}`}
                        >
                            MORNING
                        </button>
                        <button 
                            type="button"
                            onClick={() => setForm({...form, shift: 'Night'})}
                            className={`py-3 rounded-xl font-bold text-xs transition-all ${form.shift === 'Night' ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-500 border border-slate-800'}`}
                        >
                            NIGHT
                        </button>
                    </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button
                  onClick={() => setShowAdd(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
                >
                  ABORT
                </button>
                <button
                  onClick={addStaff}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg transition-all"
                >
                  RECRUIT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Staff;