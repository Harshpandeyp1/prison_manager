import React, { useState } from "react";
import Layout from "./Layout";
import { Zap, Target, Fingerprint, ChevronRight, X } from "lucide-react";

export default function Pulse() {
  const [pulse] = useState([
    {
      id: "HIT-001",
      type: "CONFLICT",
      priority: "CRITICAL",
      subject: "Rahul Verma",
      match: "Vikram Singh",
      location: "Cell Block B",
      detail: "Rival gang affiliation detected in same sector."
    },
    {
      id: "HIT-004",
      type: "LEGAL",
      priority: "HIGH",
      subject: "Suresh Raina",
      match: "New Warrant",
      location: "District Court",
      detail: "New warrant issued for Case #7721 (Non-bailable)."
    },
    {
      id: "HIT-009",
      type: "BIOMETRIC",
      priority: "MEDIUM",
      subject: "Unknown",
      match: "Blacklist #09",
      location: "Visitor Gate 2",
      detail: "Facial recognition matched blacklisted visitor profile."
    }
  ]);

  // 🔹 ADDED STATE (logic only)
  const [selectedPulse, setSelectedPulse] = useState(null);

  return (
    <Layout>
      <div className="flex-1 p-8 bg-slate-950 text-slate-200 font-sans min-h-screen border border-blue-500 rounded-2xl">
        {/* Header */}
        <header className="mb-12 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em]">
                Live Intelligence Feed
              </span>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
              System Pulse
            </h1>
          </div>

          <div className="bg-slate-900 border border-white p-4 rounded-2xl flex gap-8">
            <div className="text-center">
              <p className="text-slate-500 text-[10px] uppercase font-bold">Total Matches</p>
              <p className="text-xl font-mono text-white font-bold tracking-widest">09</p>
            </div>
            <div className="w-px bg-slate-800" />
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-red-500">Critical</p>
              <p className="text-xl font-mono text-red-500 font-bold tracking-widest">02</p>
            </div>
          </div>
        </header>

        {/* Pulse Cards */}
        <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
          {pulse.map((hit) => (
            <div
              key={hit.id}
              className="relative group bg-slate-900 border border-white rounded-2xl overflow-hidden hover:border-red-600/50 transition-all duration-500 shadow-2xl"
            >
              {hit.priority === "CRITICAL" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
              )}

              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div
                    className={`p-4 rounded-xl ${
                      hit.priority === "CRITICAL"
                        ? "bg-red-600/20 text-red-500"
                        : "bg-blue-600/20 text-blue-500"
                    }`}
                  >
                    {hit.type === "CONFLICT" ? (
                      <Target size={24} />
                    ) : hit.type === "BIOMETRIC" ? (
                      <Fingerprint size={24} />
                    ) : (
                      <Zap size={24} />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-mono text-slate-500">{hit.id}</span>
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                          hit.priority === "CRITICAL"
                            ? "border-red-600/30 text-red-500"
                            : "border-blue-600/30 text-blue-400"
                        }`}
                      >
                        {hit.priority}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {hit.subject} <span className="text-slate-500 mx-2">↔</span> {hit.match}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">{hit.detail}</p>
                  </div>
                </div>

                {/* 🔹 ONLY CHANGE: onClick added */}
                <div className="flex items-center gap-8 border-l border-slate-800 pl-8">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                      Detection Zone
                    </p>
                    <p className="text-sm font-mono text-slate-200">{hit.location}</p>
                  </div>

                  <button
                    onClick={() => setSelectedPulse(hit)}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all group-hover:scale-110 active:scale-95 shadow-lg"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/50 px-6 py-2 border-t border-slate-800 flex justify-between items-center">
                <div className="flex gap-4 text-[9px] font-mono text-slate-600">
                  <span>SOURCE: AUTO_SCAN_V4</span>
                  <span>CONFIDENCE: 98.4%</span>
                </div>
                <button className="text-[9px] font-black uppercase text-slate-500 hover:text-red-500 tracking-widest">
                  Acknowledge & Clear
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 DETAIL MODAL (ENHANCED, UI PRESERVED) */}
{selectedPulse && (
  <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
    
    {/* Modal Card */}
    <div className="relative w-full max-w-xl rounded-3xl 
      bg-slate-900 border border-slate-700 
      shadow-[0_0_80px_-20px_rgba(59,130,246,0.35)]
      animate-in fade-in zoom-in duration-200">

      {/* Close Button */}
      <button
        onClick={() => setSelectedPulse(null)}
        className="absolute top-5 right-5 rounded-full p-2 
          bg-slate-800 hover:bg-slate-700 
          text-slate-400 hover:text-white transition"
      >
        <X size={18} />
      </button>

      <div className="p-10 space-y-8">

        {/* Header */}
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-white leading-tight">
            {selectedPulse.subject}
          </h2>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold 
              bg-blue-600/20 text-blue-400 border border-blue-600/30">
              {selectedPulse.type}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold 
              bg-red-600/20 text-red-400 border border-red-600/30">
              {selectedPulse.priority}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-xs uppercase font-bold">Pulse ID</p>
            <p className="text-white font-semibold mt-1">{selectedPulse.id}</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-xs uppercase font-bold">Location</p>
            <p className="text-white font-semibold mt-1">{selectedPulse.location}</p>
          </div>
        </div>

        {/* Detail Box */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-sm text-slate-300 leading-relaxed">
          {selectedPulse.detail}
        </div>

        {/* Action */}
        <button
          onClick={() => setSelectedPulse(null)}
          className="w-full bg-blue-600 hover:bg-blue-500 
            text-white py-4 rounded-xl 
            font-black uppercase text-xs tracking-widest
            transition active:scale-[0.98]"
        >
          Close Report
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </Layout>
  );
}
