import React, { useState } from "react";
import { 
  UserPlus, 
  ShieldAlert, 
  Sparkles, 
  BrainCircuit, 
  Loader2, 
  Terminal,
  Fingerprint
} from "lucide-react";

/**
 * Helper function for Intelligence
 * Switches between Real Gemini API and local Mock logic.
 * You can move this to a separate utility file (e.g., aiUtils.js)
 */
const callIntelligence = async (prompt, type = "general") => {
  const apiKey = ""; // Insert Gemini API Key here for real AI, or leave empty for "Mock Mode"
  
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const input = prompt.toLowerCase();
    
    if (type === "risk") {
      const isCritical = /murder|kill|bomb|weapon|escape|terror|assault/i.test(input);
      return JSON.stringify({
        riskLevel: isCritical ? "Critical" : "Medium",
        profile: isCritical ? "Subject displays extreme volatility. High probability of violent recidivism." : "Subject shows standard compliance patterns. No immediate red flags.",
        block: isCritical ? "D-WING (Isolation)" : "B-BLOCK (General)"
      });
    }
    return "Manual Override: Intelligence module operating in offline mode.";
  }

  const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const response = await fetch(MODEL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Gathering intel...";
};

const AddPrisoner = ({ onAdd, isLockdown }) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
    crime: "",
    sentence: "",
    status: "Under Trial",
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const analyzeProfile = async () => {
    if (!form.crime) return;
    setIsAnalyzing(true);
    setAiAnalysis(null);
    try {
      const res = await callIntelligence(`Analyze Crime: ${form.crime}`, "risk");
      // Clean potential markdown from AI response
      const cleanJson = res.replace(/```json|```/gi, "").trim();
      setAiAnalysis(JSON.parse(cleanJson));
    } catch (e) { 
      console.error("AI Analysis Error:", e); 
      setAiAnalysis({ riskLevel: "UNKNOWN", profile: "AI uplink interrupted.", block: "UNASSIGNED" });
    } finally { 
      setIsAnalyzing(false); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.name || !form.age || !form.crime) return;

    // Trigger Success Notification
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Callback to parent registry
    onAdd({ 
      ...form, 
      prisonerId: form.id, 
      risk: aiAnalysis?.riskLevel || "Medium",
      id: Date.now() 
    });

    // Reset Form
    setForm({
      id: "",
      name: "",
      age: "",
      crime: "",
      sentence: "",
      status: "Under Trial",
    });
    setAiAnalysis(null);
  };

  if (isLockdown) {
    return (
      <div className="h-full flex flex-col items-center justify-center border-2 border-red-600/20 rounded-[2.5rem] bg-red-600/5 text-red-500 animate-pulse p-10 shadow-inner">
        <ShieldAlert size={64} strokeWidth={1} className="mb-4" />
        <h3 className="font-black text-xl uppercase tracking-tighter italic text-center leading-none mb-2">Registry Frozen</h3>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-center opacity-70">Emergency lockdown protocol: active</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-125 space-y-6 relative group/intake bg-slate-900/50 border border-blue-500 p-6 rounded-[2rem] shadow-2xl">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
          <UserPlus size={16} className="text-blue-500" /> Intake Protocol
        </h3>
        <span className="text-[9px] font-mono text-slate-700 bg-black/40 px-2 py-0.5 rounded border border-slate-800 uppercase tracking-widest">secured_node</span>
      </div>

      {/* Internal Success Alert */}
      {showSuccess && (
        <div className="absolute top-12 left-6 right-6 z-50 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-3 rounded-xl text-center shadow-xl shadow-emerald-900/40 animate-in fade-in slide-in-from-top-4 duration-300">
          ✓ RECORD_COMMITTED_SUCCESSFULLY
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col h-full overflow-auto custom-scrollbar pr-1 pb-2">
        {/* Row 1: ID & Age */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Inmate ID</label>
            <input name="id" value={form.id} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs outline-none focus:border-blue-500/50 transition-all text-slate-100 placeholder:text-slate-800 shadow-inner" placeholder="ID-XXXX" required />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Chronological Age</label>
            <input name="age" type="number" value={form.age} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs outline-none focus:border-blue-500/50 transition-all text-slate-100 placeholder:text-slate-800 shadow-inner" placeholder="00" required />
          </div>
        </div>

        {/* Row 2: Full Name */}
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Legal Identity</label>
          <div className="relative">
            <input name="name" value={form.name} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs outline-none focus:border-blue-500/50 transition-all text-slate-100 placeholder:text-slate-800 shadow-inner" placeholder="Last Name, First Name..." required />
            <Fingerprint className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-800 opacity-20" size={16} />
          </div>
        </div>

        {/* Row 3: Offense Matrix & AI Analysis */}
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Felony Specification</label>
          <div className="flex gap-2">
            <input name="crime" value={form.crime} onChange={handleChange} className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs outline-none focus:border-blue-500/50 transition-all text-slate-100 placeholder:text-slate-800 shadow-inner" placeholder="Primary crime details..." required />
            <button type="button" onClick={analyzeProfile} disabled={!form.crime || isAnalyzing} className="px-3 bg-slate-800 border border-slate-700 rounded-xl hover:border-blue-500/50 transition-all group active:scale-95">
              {isAnalyzing ? <Loader2 size={16} className="animate-spin text-blue-500" /> : <Sparkles size={16} className="text-blue-500 group-hover:scale-110" />}
            </button>
          </div>
        </div>

        {/* Row 4: Sentence & Legal Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Duration</label>
            <input name="sentence" value={form.sentence} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs outline-none focus:border-blue-500/50 transition-all text-slate-100 placeholder:text-slate-800 shadow-inner" placeholder="Years / Life" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Registry state</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs outline-none focus:border-blue-500/50 text-slate-400 appearance-none shadow-inner cursor-pointer">
              <option value="Under Trial">Under Trial</option>
              <option value="Convicted">Convicted</option>
            </select>
          </div>
        </div>

        {/* Predictive AI Feedback Block */}
        {aiAnalysis && (
          <div className="bg-blue-600/5 border border-blue-500 p-4 rounded-2xl animate-in slide-in-from-top-2 border-dashed border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1.5"><BrainCircuit size={12}/> Predictive insight</span>
                <span className={`text-[9px] font-mono font-black px-1.5 py-0.5 rounded ${aiAnalysis.riskLevel === 'Critical' ? 'bg-red-900/40 text-red-300' : 'bg-blue-900/40 text-blue-300'}`}>{aiAnalysis.riskLevel}</span>
            </div>
            <p className="text-[9px] text-slate-500 italic leading-relaxed">"{aiAnalysis.profile}"</p>
            <p className="text-[9px] font-bold text-slate-700 mt-2 uppercase tracking-widest">Block: <span className="text-blue-500 font-mono">{aiAnalysis.block}</span></p>
          </div>
        )}

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-blue-900/20 transition-all active:scale-95 flex items-center justify-center gap-3 mt-auto border-b-4 border-blue-800 active:border-b-0">
          {/* lord-icon requires the script to be present in your index.html */}
          <lord-icon
            src="https://cdn.lordicon.com/hmpomorl.json"
            trigger="hover"
            colors="primary:#ffffff"
            stroke="bold"
            style={{ width: "22px", height: "22px" }}
          />
          Authorize Commitment
        </button>
      </form>
    </div>
  );
};

export default AddPrisoner;