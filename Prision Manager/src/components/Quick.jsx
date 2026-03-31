import React, { useState } from "react";
import { 
  Zap, 
  ShieldAlert, 
  Stethoscope, 
  Radio, 
  Lock, 
  X, 
  ShieldCheck, 
  Loader2, 
  BrainCircuit, 
  Sparkles,
  Send,
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  Activity
} from "lucide-react";

// --- SYSTEM CONFIGURATION ---
const apiKey = ""; // Insert Gemini API Key here for real AI, or leave empty for "Mock Mode"

/**
 * Quick Action Intelligence
 * Generates emergency scripts and tactical triage.
 */
const callQuickIntelligence = async (action, context = "") => {
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (action === "broadcast") {
      return `ATTENTION_ALL_SECTORS: ${context === 'lockdown' ? 'EMERGENCY_LOCKDOWN_ENGAGED. Return to containment units immediately. Lethal force authorized for non-compliance.' : 'Security status: NOMINAL. Resume standard operational rotations. Biometric sync complete.'}`;
    }
    
    if (action === "medical") {
      return "TRIAGE_REPORT: Medical dispatch prioritized for Sector 4. Level-2 medical emergency detected. Tactical medics en route.";
    }

    return "AI_UPLINK: Protocol established.";
  }

  const prompt = `Generate a short, cold, high-security prison broadcast for the following action: ${action}. Facility status: ${context}.`;
  const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Broadcast signal weak.";
  } catch (e) {
    return "Error: Neural uplink interrupted.";
  }
};

const QuickActions = ({ isLockdown, onLockdownToggle }) => {
  const [activeModal, setActiveModal] = useState(null); // 'lockdown', 'medical', 'comms'
  const [authForm, setAuthForm] = useState({ name: "", confirm: false });
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiOutput, setAiOutput] = useState("");

  const handleAction = async (type) => {
    setIsProcessing(true);
    setAiOutput("");
    const output = await callQuickIntelligence(type, isLockdown ? 'lockdown' : 'stable');
    setAiOutput(output);
    setIsProcessing(false);
  };

  const handleAuthorizeLockdown = (e) => {
    e.preventDefault();
    if (authForm.name.trim() && authForm.confirm) {
      onLockdownToggle(!isLockdown);
      setActiveModal(null);
      setAuthForm({ name: "", confirm: false });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setAiOutput("");
    setAuthForm({ name: "", confirm: false });
  };

  return (
    <div className="bg-slate-900/50 border border-red-950 p-5 w-385
     flex rounded-[2.5rem] shadow-2xl transition-all hover:border-red-500/20">
      
      {/* 🔷 HEADER SECTOR */}
      <div className="flex items-center  mb-6 px-2">
        <div>
          <h2 className={`text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2 ${isLockdown ? 'text-red-500' : 'text-blue-500'}`}>
            <Zap size={14} className={isLockdown ? 'animate-pulse' : 'text-amber-500'} /> Emergency protocols
          </h2>
         
        <p className="text-[8px] font-mono text-slate-600 uppercase flex items-center gap-2">
            <Activity size={10} className="text-blue-500" /> System heart-beat: nominal
        </p>
     
          <p className="text-[9px] text-slate-600 font-mono mt-1 uppercase tracking-widest leading-none">Command_Matrix_v1.0</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping opacity-20"></div>
      </div>

      {/* ⚡ ACTION GRID */}
      <div className="flex-1 flex flex-col gap-3">
        
        {/* LOCKDOWN BUTTON */}
        <button 
          onClick={() => isLockdown ? onLockdownToggle(false) : setActiveModal('lockdown')}
          className={`group w-full p-4 rounded-2xl border transition-all flex items-center justify-between active:scale-[0.98] ${isLockdown ? 'bg-red-600/10 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)]' : 'bg-slate-950 border-slate-800 hover:border-red-500/50'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${isLockdown ? 'bg-red-500 border-red-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-500 group-hover:text-red-500 transition-colors'}`}>
              <ShieldAlert size={18} className={isLockdown ? 'animate-spin-slow' : ''} />
            </div>
            <div className="text-left">
              <p className={`text-[10px] font-black uppercase tracking-widest ${isLockdown ? 'text-red-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                {isLockdown ? 'Terminate Lockdown' : 'Execute Lockdown'}
              </p>
              <p className="text-[8px] font-mono text-slate-600 uppercase">Protocol: Code_Red</p>
            </div>
          </div>
          <ChevronRight size={14} className="text-slate-800 group-hover:text-slate-400" />
        </button>

        {/* MEDICAL DISPATCH */}
        <button 
          onClick={() => setActiveModal('medical')}
          className="group w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all flex items-center justify-between active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 group-hover:text-emerald-500 transition-colors">
              <Stethoscope size={18} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 group-hover:text-slate-200 uppercase tracking-widest">Medical Dispatch</p>
              <p className="text-[8px] font-mono text-slate-600 uppercase">Triage: Sector_All</p>
            </div>
          </div>
          <ChevronRight size={14} className="text-slate-800 group-hover:text-slate-400" />
        </button>

        {/* EMERGENCY COMMS */}
        <button 
          onClick={() => setActiveModal('comms')}
          className="group w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all flex items-center justify-between active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 group-hover:text-blue-500 transition-colors">
              <Radio size={18} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 group-hover:text-slate-200 uppercase tracking-widest">Emergency Comms</p>
              <p className="text-[8px] font-mono text-slate-600 uppercase">Node: Facility_Wide</p>
            </div>
          </div>
          <ChevronRight size={14} className="text-slate-800 group-hover:text-slate-400" />
        </button>

      </div>

      {/* 🔷 FOOTER LOGS */}
      

      {/* 🔍 MODAL OVERLAYS */}
      
      {/* 1. LOCKDOWN MODAL */}
      {activeModal === 'lockdown' && (
        <div className="fixed inset-0 z-[250] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-[3rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600 shadow-[0_0_20px_red]"></div>
            <div className="p-10 space-y-8">
              <div className="text-center">
                <div className="inline-flex bg-red-600/10 p-4 rounded-3xl border border-red-600/20 mb-4">
                    <Lock className="text-red-500" size={32} />
                </div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">Security Authorization</h2>
                <p className="text-xs text-slate-500 mt-2 font-mono uppercase tracking-widest">Code: EMERGENCY_LOCKDOWN</p>
              </div>
              <form onSubmit={handleAuthorizeLockdown} className="space-y-6">
                <input 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm font-bold outline-none focus:border-red-500/50 text-slate-100 transition-all shadow-inner" 
                  placeholder="Officer ID / Name" 
                  value={authForm.name} 
                  onChange={e => setAuthForm({...authForm, name: e.target.value})} 
                  required 
                />
                <label className="flex items-start gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-600 transition-colors">
                  <input type="checkbox" className="mt-1" checked={authForm.confirm} onChange={e => setAuthForm({...authForm, confirm: e.target.checked})} required />
                  <span className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed tracking-tight">I verify that this action is necessary and I assume full responsibility.</span>
                </label>
                <div className="flex gap-4">
                  <button type="button" onClick={closeModal} className="flex-1 bg-slate-800 text-slate-400 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest border border-slate-700 hover:bg-slate-700 transition-all">Cancel</button>
                  <button type="submit" className="flex-[2] bg-red-600 text-white py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-red-900/30 shadow-lg hover:bg-red-500 active:scale-95 transition-all">Authorize</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 2. EMERGENCY COMMS / MEDICAL MODAL */}
      {(activeModal === 'medical' || activeModal === 'comms') && (
        <div className="fixed inset-0 z-[250] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-[3rem] w-full max-w-xl shadow-2xl relative overflow-hidden animate-in zoom-in-95">
            <div className={`absolute top-0 left-0 w-full h-1.5 ${activeModal === 'medical' ? 'bg-emerald-500' : 'bg-blue-600'}`}></div>
            <button onClick={closeModal} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-all bg-slate-800/50 p-1.5 rounded-full"><X size={18} /></button>
            
            <div className="p-12 space-y-8">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${activeModal === 'medical' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {activeModal === 'medical' ? <Stethoscope size={24} /> : <Radio size={24} />}
                </div>
                <div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
                    {activeModal === 'medical' ? 'Medical Dispatch' : 'Emergency Comms'}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-600 mt-1 uppercase tracking-widest">Protocol: Active_Command_Link</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-8 rounded-[2rem] relative group min-h-[160px] flex items-center justify-center shadow-inner">
                <div className="absolute top-4 right-6 text-[9px] font-mono text-blue-500/20 uppercase tracking-widest font-black">AI_Protocol_Link</div>
                
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-3 text-blue-500/40">
                    <Loader2 className="animate-spin" size={24}/>
                    <span className="text-[10px] font-mono uppercase tracking-widest">Generating secure script...</span>
                  </div>
                ) : aiOutput ? (
                  <div className="space-y-4 w-full">
                    <p className="text-xs text-slate-400 font-mono leading-relaxed italic border-l-4 border-blue-900/50 pl-6 animate-in fade-in slide-in-from-left-4">
                      {aiOutput}
                    </p>
                    <div className="bg-blue-600/5 border border-blue-500/10 p-3 rounded-xl flex items-center gap-3">
                        <AlertTriangle size={14} className="text-blue-500" />
                        <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">AI Generated broadcast ready for transmit</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-xs text-slate-600 font-mono italic">Strategic AI module standing by for parameters...</p>
                    <button 
                        onClick={() => handleAction(activeModal === 'medical' ? 'medical' : 'broadcast')}
                        className="bg-blue-600/10 border border-blue-500/20 text-blue-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all flex items-center gap-2 mx-auto"
                    >
                        <Sparkles size={12} /> Initialize AI Broadcast
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button onClick={closeModal} className="flex-1 bg-slate-800 text-slate-400 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest border border-slate-700 hover:bg-slate-700 transition-all">Abort</button>
                <button 
                    disabled={!aiOutput}
                    className="flex-[2] bg-blue-600 disabled:opacity-30 disabled:grayscale text-white py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <Send size={14} /> Execute Broadcast
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default QuickActions;