import React, { useState } from "react";
import {
  ShieldAlert,
  Zap,
  Droplets,
  X,
  HardHat,
  UserCheck,
  Lock,
  Activity,
} from "lucide-react";
import Navbar from "./Navbar";

/**
 * Layout Component
 * - Navbar stays full-width
 * - EVERYTHING after Navbar is wrapped in a bordered bg-slate-900 container
 */
const Layout = ({ children }) => {
  return (
    <div className=" p-4  bg-slate-950">
    <Navbar />
    <div className=" bg-slate-900 font-sans  text-slate-200 ">

      {/* 🔒 Bordered Content Area */}
      <main className="flex-1 p-6">
        <div className="max-h-screen bg-slate-950 border border-blue-500 rounded-2xl ">
          {children}
        </div>
      </main>
    </div>
    </div>
  );
};

export default function Facilities() {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const blocks = [
    {
      id: "A",
      name: "Alpha Block",
      type: "MAX-SECURITY",
      cells: 50,
      occupied: 48,
      status: "Secure",
      warden: "Commander Thorne",
      lastInspection: "2024-01-15",
      infrastructure: { power: "Stable", water: "Normal", security: "High" },
    },
    {
      id: "B",
      name: "Bravo Block",
      type: "MED-SECURITY",
      cells: 100,
      occupied: 85,
      status: "Maintenance",
      warden: "Sergeant Jenkins",
      lastInspection: "2024-01-20",
      infrastructure: { power: "Partial", water: "Normal", security: "Medium" },
    },
    {
      id: "C",
      name: "Charlie Block",
      type: "MIN-SECURITY",
      cells: 120,
      occupied: 40,
      status: "Secure",
      warden: "Officer Vance",
      lastInspection: "2023-12-28",
      infrastructure: { power: "Stable", water: "Normal", security: "Low" },
    },
    {
      id: "D",
      name: "Delta Wing",
      type: "ISOLATION",
      cells: 20,
      occupied: 5,
      status: "Critical",
      warden: "Warden Blackwood",
      lastInspection: "2024-01-28",
      infrastructure: {
        power: "Emergency",
        water: "Restricted",
        security: "Maximum",
      },
    },
  ];

  return (
    <Layout>
      <div className="p-10  mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
            Facility Overview
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">
            Infrastructure & Capacity Control Command
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-white p-6 rounded-3xl">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Total Capacity
            </p>
            <p className="text-3xl font-black text-white">290 Cells</p>
          </div>

          <div className="bg-slate-900 border border-white p-6 rounded-3xl border-l-4 border-blue-600">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Active Occupancy
            </p>
            <p className="text-3xl font-black text-white">178 / 61%</p>
          </div>

          <div className="bg-slate-900 border border-white p-6 rounded-3xl">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Infrastructure Alerts
            </p>
            <p className="text-3xl font-black text-amber-500">04 Active</p>
          </div>
        </div>

        {/* Blocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blocks.map((block) => (
            <div
              key={block.id}
              onClick={() => setSelectedBlock(block)}
              className="bg-slate-900 border border-blue-500 rounded-[2rem] p-8 hover:border-blue-500/40 transition-all cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {block.name}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {block.type} • ID_{block.id}
              </p>

              <div className="mb-6">
                <div className="flex justify-between text-xs mb-2">
                  <span>Load Factor</span>
                  <span>
                    {block.occupied}/{block.cells}
                  </span>
                </div>
                <div className="h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full ${
                      block.status === "Critical"
                        ? "bg-red-600"
                        : "bg-blue-600"
                    }`}
                    style={{
                      width: `${(block.occupied / block.cells) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center text-slate-500">
                <Zap size={18} />
                <Droplets size={18} />
                <ShieldAlert size={18} />
                <span className="ml-auto text-xs text-blue-400">
                  Open Dossier →
                </span>
              </div>
            </div>
          ))}
        </div>

       {/* FACILITY DETAIL POPUP (MODAL) */}
        {selectedBlock && (
          <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl flex justify-center items-center z-[100] p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-[3rem] w-full max-w-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden animate-in fade-in zoom-in duration-300">
              
              {/* Status Header Stripe */}
              <div className={`h-2.5 w-full ${selectedBlock.status === 'Secure' ? 'bg-emerald-500' : selectedBlock.status === 'Maintenance' ? 'bg-amber-500' : 'bg-red-600'}`}></div>
              
              <button 
                onClick={() => setSelectedBlock(null)}
                className="absolute top-8 right-10 text-slate-500 hover:text-white transition-all hover:rotate-90 p-2"
              >
                <X size={28} />
              </button>

              <div className="p-12 text-slate-200">
                <div className="mb-10 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                        <div className="bg-blue-600 p-2 rounded-xl">
                            <Lock className="text-white" size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">{selectedBlock.name}</h2>
                    </div>
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                        Dossier Code: {selectedBlock.type}_X7 // BLOCK_{selectedBlock.id}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Personnel Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-5 bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-inner">
                            <div className="bg-blue-600/10 p-4 rounded-2xl text-blue-400">
                                <UserCheck size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-0.5">Warden Assigned</p>
                                <p className="font-bold text-lg text-slate-200">{selectedBlock.warden}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-inner">
                            <div className="bg-slate-800 p-4 rounded-2xl text-slate-400">
                                <HardHat size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-0.5">Physical Audit</p>
                                <p className="font-bold text-lg text-slate-200">{selectedBlock.lastInspection}</p>
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure Monitor */}
                    <div className="bg-slate-950/40 p-8 rounded-[2rem] border border-slate-800 relative">
                        <div className="absolute top-4 right-6">
                            <Activity size={16} className="text-blue-500 animate-pulse" />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6 border-b border-slate-800 pb-3">Infrastructure Matrix</h4>
                        <div className="space-y-5">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Power Grid</span>
                                <span className={`text-xs font-mono font-black ${selectedBlock.infrastructure.power === 'Emergency' ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {selectedBlock.infrastructure.power.toUpperCase()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Water Systems</span>
                                <span className="text-xs font-mono font-black text-blue-400">
                                    {selectedBlock.infrastructure.water.toUpperCase()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Security Level</span>
                                <span className="text-xs font-mono font-black text-slate-200">
                                    {selectedBlock.infrastructure.security.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-5">
                    <button className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-400 py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all border border-slate-700">
                        Generate PDF Report
                    </button>
                    <button 
                        onClick={() => setSelectedBlock(null)}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-2xl transition-all active:scale-95"
                    >
                        Dismiss Dossier
                    </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
