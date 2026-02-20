import React, { useState } from "react";
import { 
  Users, 
  Shield, 
  UserCheck, 
  UserX, 
  Briefcase, 
  Activity, 
  Sparkles, 
  BrainCircuit, 
  Loader2, 
  AlertTriangle 
} from "lucide-react";

// --- SYSTEM CONFIGURATION ---
const apiKey = ""; // Insert Gemini API Key here for real AI, or leave empty for "Mock Mode"

/**
 * Staff Intelligence Handler
 * Evaluates the current staff composition against security protocols.
 */
const callStaffIntelligence = async (staffCount, activeCount, roles) => {
  if (!apiKey) {
    // Simulated delay for "thinking" effect
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `FORCE_ANALYSIS_COMPLETE: Current team composition (Ratio ${activeCount}/${staffCount}) is within optimal parameters. The presence of specialized roles ensures sector stability. No immediate tactical vulnerabilities detected.`;
  }

  const prompt = `Analyze a prison staff team. Total: ${staffCount}, On Duty: ${activeCount}. Roles: ${roles.join(", ")}. Provide a 2-sentence tactical readiness report.`;

  const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  try {
    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Intelligence gathering timed out.";
  } catch (e) {
    return "Error: Neural uplink interrupted.";
  }
};

const Dashstaff = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: "Commander Thorne", role: "Chief Warden", status: "Working" },
    { id: 2, name: "Officer Jenkins", role: "Tactical Guard", status: "Working" }
  ]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  
  // AI States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState(null);

  const addStaff = () => {
    if (!name || !role) return;

    const newStaff = {
      id: Date.now(),
      name,
      role,
      status: "Working",
    };

    setStaff([...staff, newStaff]);
    setName("");
    setRole("");
  };

  const toggleStatus = (id) => {
    setStaff(
      staff.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Working" ? "Absent" : "Working" }
          : s
      )
    );
  };

  const runForceAnalysis = async () => {
    setIsAnalyzing(true);
    setAiReport(null);
    const roles = staff.map(s => s.role);
    const active = staff.filter(s => s.status === "Working").length;
    
    const report = await callStaffIntelligence(staff.length, active, roles);
    setAiReport(report);
    setIsAnalyzing(false);
  };

  const activeCount = staff.filter(s => s.status === "Working").length;

  return (
    <div className="bg-slate-900/50 border border-emerald-600 p-5 h-125 flex flex-col rounded-[2.5rem] shadow-2xl transition-all hover:border-blue-500/30">
      {/* 🔷 HEADER SECTOR */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div>
          <h2 className="text-blue-500 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
            <Shield size={14} /> Staff Operations
          </h2>
          <p className="text-[9px] text-slate-600 font-mono mt-0.5 uppercase tracking-widest leading-none">Active_Force_Matrix</p>
        </div>
        <div className="flex gap-1.5">
            <button 
                onClick={runForceAnalysis}
                disabled={isAnalyzing || staff.length === 0}
                className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 p-1.5 rounded-lg border border-blue-500/20 transition-all active:scale-90 disabled:opacity-30 group"
                title="AI Tactical Analysis"
            >
                {isAnalyzing ? <Loader2 size={12} className="animate-spin" /> : <BrainCircuit size={12} className="group-hover:rotate-12 transition-transform" />}
            </button>
            <div className="bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1.5">
                <span className="text-[9px] font-mono text-slate-400">{activeCount.toString().padStart(2, '0')}</span>
                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
            </div>
        </div>
      </div>

      {/* ➕ LOGISTICS ENROLLMENT */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex flex-col gap-1.5">
          <input
            type="text"
            placeholder="Personnel Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-[11px] text-white w-full outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700 shadow-inner"
          />
          <input
            type="text"
            placeholder="Tactical Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-[11px] text-white w-full outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700 shadow-inner"
          />
        </div>

        <button
          onClick={addStaff}
          className="px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all active:scale-95 flex items-center justify-center shadow-lg shadow-blue-900/20 group"
        >
          <lord-icon
            src="https://cdn.lordicon.com/hmpomorl.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#ffffff"
            style={{ width: "20px", height: "20px" }}
          />
        </button>
      </div>

      {/* ✨ AI ANALYSIS OUTPUT (Compact) */}
      {aiReport && (
        <div className="mb-3 bg-blue-600/5 border border-blue-500/20 p-3 rounded-xl animate-in slide-in-from-top-2 relative overflow-hidden group shrink-0">
            <div className="flex items-center gap-2 mb-0.5">
                <Sparkles size={10} className="text-blue-400" />
                <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Tactical Briefing</span>
            </div>
            <p className="text-[9px] text-slate-400 font-mono italic leading-tight">
                {aiReport}
            </p>
        </div>
      )}

      {/* 👥 PERSONNEL DIRECTORY (SCROLLABLE) */}
      <div className="overflow-y-auto flex-1 space-y-1.5 pr-1.5 custom-scrollbar min-h-0">
        {staff.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-20 italic">
            <Users size={32} strokeWidth={1} />
            <p className="text-[9px] uppercase font-black tracking-widest mt-1">Registry Empty</p>
          </div>
        ) : (
          staff.map((s) => (
            <div
              key={s.id}
              className="bg-slate-950/40 border border-slate-800 p-2.5 rounded-xl flex justify-between items-center group hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${s.status === 'Working' ? 'bg-blue-600/10 border-blue-500/20 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
                    <Activity size={14} className={s.status === 'Working' ? 'animate-pulse' : ''} />
                </div>
                <div>
                  <p className="text-slate-100 font-bold text-xs tracking-tight leading-none mb-1">{s.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-black uppercase text-slate-600 tracking-tighter flex items-center gap-0.5">
                        <Briefcase size={8} /> {s.role}
                    </span>
                    <span className={`text-[8px] font-black uppercase tracking-widest ${s.status === "Working" ? "text-emerald-500" : "text-red-500"}`}>
                        {s.status}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleStatus(s.id)}
                className={`p-1.5 rounded-lg border transition-all active:scale-90 ${
                  s.status === "Working"
                    ? "border-red-900/30 text-red-500 hover:bg-red-500/10"
                    : "border-green-900/30 text-green-500 hover:bg-green-500/10"
                }`}
              >
                {s.status === "Working" ? <UserX size={12} /> : <UserCheck size={12} />}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashstaff;