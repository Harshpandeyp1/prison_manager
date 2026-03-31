import React, { useState } from "react";
import Layout from "./Layout";
const Inmates = () => {
  <Layout />
  const [inmates, setInmates] = useState([]);
  const [search, setSearch] = useState("");
  const [viewInmate, setViewInmate] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showFree, setShowFree] = useState(false);
  const [showVisitor, setShowVisitor] = useState(false);
  const [confirmFree, setConfirmFree] = useState("");

  const [newInmate, setNewInmate] = useState({
    prisonerId: "",
    name: "",
    status: "Under Trial",
    cell: "",
    crime: "",
    entryDate: new Date().toISOString().slice(0, 10),
  });

  const [freeForm, setFreeForm] = useState({
    prisonerId: "",
    officer: "",
    agree: false,
  });

  const [visitorForm, setVisitorForm] = useState({
    prisonerId: "",
    name: "",
    relation: "",
    date: new Date().toISOString().slice(0, 10),
  });

  /* STATISTICAL COUNTS */
  const totalInmates = inmates.length;
  const underTrialCount = inmates.filter(i => i.status === "Under Trial").length;
  const convictedCount = inmates.filter(i => i.status === "Convicted").length;

  /* FILTER LOGIC */
  const filteredInmates = inmates.filter((i) => {
    const q = search.toLowerCase();
    return (
      i.name.toLowerCase().includes(q) ||
      i.cell.toLowerCase().includes(q) ||
      i.status.toLowerCase().includes(q) ||
      i.prisonerId.toLowerCase().includes(q)
    );
  });

  /* CORE ACTIONS */
  const handleAddInmate = () => {
    const { prisonerId, name, cell, crime, status, entryDate } = newInmate;
    
    if (!prisonerId || !name || !cell || !crime) {
      return alert("All fields are required");
    }

    if (inmates.some(i => i.prisonerId.trim().toLowerCase() === prisonerId.trim().toLowerCase())) {
      return alert("Prisoner ID must be unique");
    }

    const inmateEntry = {
      id: Date.now(),
      prisonerId: prisonerId.trim(),
      name: name.trim(),
      cell: cell.trim(),
      crime: crime.trim(),
      status,
      entryDate,
      visitors: []
    };

    setInmates([...inmates, inmateEntry]);
    setShowAdd(false);
    
    setNewInmate({ 
      prisonerId: "", 
      name: "", 
      status: "Under Trial", 
      cell: "", 
      crime: "", 
      entryDate: new Date().toISOString().slice(0, 10) 
    });
  };

  const handleFreeInmate = () => {
    const { prisonerId, officer, agree } = freeForm;
    if (!prisonerId || !officer || !agree) return alert("All fields and agreement are required");
    const inmate = inmates.find(i => i.prisonerId === prisonerId);
    if (!inmate) return alert("Invalid Prisoner ID");

    setInmates(inmates.filter(i => i.prisonerId !== prisonerId));
    setConfirmFree(inmate.name);
    setShowFree(false);
    setFreeForm({ prisonerId: "", officer: "", agree: false });
    
    setTimeout(() => setConfirmFree(""), 5000);
  };

  const handleAddVisitor = () => {
    const { prisonerId, name, relation, date } = visitorForm;
    if (!prisonerId || !name || !relation || !date) return alert("All fields are required");
    const inmateIndex = inmates.findIndex(i => i.prisonerId === prisonerId);
    if (inmateIndex === -1) return alert("Invalid Prisoner ID");

    const updatedInmates = [...inmates];
    const newVisitor = { id: Date.now(), name, relation, date, status: "present" };
    updatedInmates[inmateIndex].visitors.push(newVisitor);
    setInmates(updatedInmates);
    setVisitorForm({ prisonerId: "", name: "", relation: "", date: new Date().toISOString().slice(0, 10) });
    setShowVisitor(false);

    setTimeout(() => {
      setInmates(prev => {
        const copy = JSON.parse(JSON.stringify(prev));
        const idx = copy.findIndex(i => i.prisonerId === prisonerId);
        if (idx !== -1) {
          const vIdx = copy[idx].visitors.findIndex(v => v.id === newVisitor.id);
          if (vIdx !== -1) copy[idx].visitors[vIdx].status = "left";
        }
        return copy;
      });
    }, 10 * 60 * 1000);
  };

  const daysInJail = (entryDate) => Math.floor((new Date() - new Date(entryDate)) / (1000 * 60 * 60 * 24));

  return (
    <Layout>
      <div className="p-8 text-white min-h-screen mx-auto bg-slate-950 border border-blue-500 rounded-2xl ">
        <h1 className="text-3xl font-bold tracking-widest text-white font-serif mb-8 uppercase border-l-4 border-blue-600 pl-4">
          Inmate Registry Log
        </h1>

        {confirmFree && (
          <div className="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded mb-8 flex justify-between items-center animate-pulse">
            <span>Inmate <b>{confirmFree}</b> has been successfully processed for release.</span>
            <button onClick={() => setConfirmFree("")} className="hover:text-white">✕</button>
          </div>
        )}

        {/* SEARCH + STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 ">
          <div className="md:col-span ">
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-2 ml-1">Universal Search</p>
            <input 
              placeholder="ID, Name or Cell..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 text-white border border-slate-800 p-3 rounded outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <div className="bg-slate-900 p-5 rounded-xl border border-white shadow-lg">
            <p className="text-slate-500 text-xs uppercase font-bold tracking-tighter">Total Inmates</p>
            <p className="text-3xl font-black mt-1">{totalInmates}</p>
          </div>
          <div className="bg-slate-900 p-5 rounded-xl border border-white shadow-lg">
            <p className="text-yellow-500/80 text-xs uppercase font-bold tracking-tighter">Under Trial</p>
            <p className="text-3xl font-black mt-1 text-yellow-400">{underTrialCount}</p>
          </div>
          <div className="bg-slate-900 p-5 rounded-xl border border-white shadow-lg">
            <p className="text-red-500/80 text-xs uppercase font-bold tracking-tighter">Convicted</p>
            <p className="text-3xl font-black mt-1 text-red-400">{convictedCount}</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={() => setShowAdd(true)} className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 px-6 py-5 rounded-xl font-bold flex items-center justify-center gap-3 text-white transition-all shadow-lg active:scale-95">
            <lord-icon src="https://cdn.lordicon.com/vjgknpfx.json" trigger="hover" stroke="bold" colors="primary:#ffffff,secondary:#ffffff" style={{ width: "24px", height: "24px" }} />
            ADD INMATE
          </button>

          <button onClick={() => setShowFree(true)} className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700 px-6 py-5 rounded-xl font-bold flex items-center justify-center gap-3 text-white transition-all shadow-lg active:scale-95">
            <lord-icon src="https://cdn.lordicon.com/bazecvhf.json" trigger="hover" stroke="bold" colors="primary:#ffffff,secondary:#ffffff" style={{ width: "24px", height: "24px" }} />
            RELEASE INMATE
          </button>

          <button onClick={() => setShowVisitor(true)} className="flex-1 cursor-pointer bg-white hover:bg-slate-200 px-6 py-5 rounded-xl font-bold flex items-center justify-center gap-3 text-slate-950 transition-all shadow-lg active:scale-95">
            <lord-icon src="https://cdn.lordicon.com/vjgknpfx.json" trigger="hover" stroke="bold" colors="primary:#000000,secondary:#000000" style={{ width: "24px", height: "24px" }} />
            LOG VISITOR
          </button>
        </div>

        {/* REGISTRY TABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-950 rounded-2xl border border-white overflow-hidden flex flex-col shadow-2xl h-[550px]">
            <div className="p-4 bg-black border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-slate-200 uppercase text-xs tracking-widest">Inmate Registry</h3>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-mono">DB_CONNECTED</span>
            </div>
            <div className="overflow-auto flex-1 custom-scrollbar">
                <table className="w-full text-left">
                <thead className="bg-black sticky top-0 z-10">
                    <tr>
                    <th className="p-4 text-xs font-bold text-white uppercase tracking-tighter">ID</th>
                    <th className="p-4 text-xs font-bold text-white uppercase tracking-tighter">Inmate Name</th>
                    <th className="p-4 text-xs font-bold text-white uppercase tracking-tighter">Classification</th>
                    <th className="p-4 text-xs font-bold text-white uppercase tracking-tighter text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {filteredInmates.length === 0 ? (
                    <tr><td colSpan="4" className="p-12 text-center text-slate-600 italic text-sm">No records found</td></tr>
                    ) : filteredInmates.map((i) => (
                    <tr key={i.id} className="hover:bg-blue-500/5 transition-colors group">
                        <td className="p-4 font-mono text-sm text-white">{i.prisonerId}</td>
                        <td className="p-4 font-medium">{i.name}</td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-black ${i.status === 'Convicted' ? 'bg-red-900/40 text-red-400' : 'bg-yellow-900/40 text-yellow-400'}`}>
                                {i.status}
                            </span>
                        </td>
                        <td className="p-4 text-center">
                        <button onClick={() => setViewInmate(i)} className="bg-slate-800 hover:bg-blue-600 px-4 py-1.5 rounded-lg text-xs font-bold transition-all border border-slate-700">Open Profile</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-white overflow-hidden flex flex-col shadow-2xl h-[550px]">
             <div className="p-4 bg-black border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-slate-200 uppercase text-xs tracking-widest">Active Visitors Log</h3>
              <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded font-mono">LIVE_FEED</span>
            </div>
            <div className="overflow-auto flex-1 custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-black sticky top-0 z-10">
                  <tr>
                    <th className="p-4 text-xs font-bold text-white  uppercase tracking-tighter">Target ID</th>
                    <th className="p-4 text-xs font-bold text-white  uppercase tracking-tighter">Visitor</th>
                    <th className="p-4 text-xs font-bold text-white uppercase tracking-tighter">Relation</th>
                    <th className="p-4 text-xs font-bold text-white uppercase tracking-tighter">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
  {inmates.flatMap(i => i.visitors.map(v => (
    <tr key={v.id} className="hover:bg-slate-800/30 transition-colors">
      <td className="p-4 font-mono text-xs text-white">{i.prisonerId}</td>
      <td className="p-4 text-sm font-semibold">{v.name}</td>
      <td className="p-4 text-xs italic text-white">{v.relation}</td>
      <td className="p-4">
        <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${v.status === 'present' ? 'text-green-400' : 'text-slate-600'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${v.status === 'present' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse' : 'bg-slate-700'}`}></div>
            {v.status}
        </span>
      </td>
    </tr>
  )))}

  {/* Show "No visits" if there are no visitors */}
  {inmates.flatMap(i => i.visitors).length === 0 && (
    <tr>
      <td colSpan="4" className="p-12 text-center text-slate-600 italic text-sm">
        No active visits logged
      </td>
    </tr>
  )}
</tbody>

              </table>
            </div>
          </div>
        </div>

        {/* MODAL OVERLAYS */}
        
        {/* ADD INMATE */}
        {showAdd && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex justify-center items-center z-[100] p-4">
            <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-md border border-slate-700">
              <h2 className="text-2xl font-serif font-bold mb-6 border-b border-slate-800 pb-4 text-blue-400">Prisoner Intake</h2>
              <div className="space-y-4">
                <input className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700 outline-none" placeholder="Serial ID" value={newInmate.prisonerId} onChange={e => setNewInmate({...newInmate, prisonerId: e.target.value})}/>
                <input className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700 outline-none" placeholder="Full Name" value={newInmate.name} onChange={e => setNewInmate({...newInmate, name: e.target.value})}/>
                <select className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700" value={newInmate.status} onChange={e => setNewInmate({...newInmate, status: e.target.value})}>
                  <option value="Under Trial">Under Trial</option>
                  <option value="Convicted">Convicted</option>
                </select>
                <input className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700 outline-none" placeholder="Cell Block" value={newInmate.cell} onChange={e => setNewInmate({...newInmate, cell: e.target.value})}/>
                <input className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700 outline-none" placeholder="Felony Specification" value={newInmate.crime} onChange={e => setNewInmate({...newInmate, crime: e.target.value})}/>
                <input type="date" className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700" value={newInmate.entryDate} onChange={e => setNewInmate({...newInmate, entryDate: e.target.value})}/>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setShowAdd(false)} className="flex-1 bg-slate-800 py-3 rounded-xl font-bold text-sm">ABORT</button>
                <button onClick={handleAddInmate} className="flex-1 bg-blue-600 py-3 rounded-xl font-bold text-sm">COMMIT TO DB</button>
              </div>
            </div>
          </div>
        )}

        {/* RELEASE INMATE */}
        {showFree && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex justify-center items-center z-[100] p-4">
            <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-md border border-slate-700 shadow-[0_0_50px_rgba(22,163,74,0.1)]">
              <h2 className="text-2xl font-serif font-bold mb-6 text-green-500">Release Protocol</h2>
              <div className="space-y-4">
                <input className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700" placeholder="Prisoner ID" value={freeForm.prisonerId} onChange={e => setFreeForm({...freeForm, prisonerId: e.target.value})}/>
                <input className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700" placeholder="Authorizing Officer" value={freeForm.officer} onChange={e => setFreeForm({...freeForm, officer: e.target.value})}/>
                <label className="flex items-start gap-3 text-xs text-slate-400 bg-slate-800/50 p-4 rounded-xl cursor-pointer">
                  <input type="checkbox" className="mt-0.5" checked={freeForm.agree} onChange={e => setFreeForm({...freeForm, agree: e.target.checked})}/>
                  <span>I solemnly declare that all legal protocols for release have been verified.</span>
                </label>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setShowFree(false)} className="flex-1 bg-slate-800 py-3 rounded-xl font-bold">CANCEL</button>
                <button onClick={handleFreeInmate} className="flex-1 bg-green-600 py-3 rounded-xl font-bold">AUTHORIZE</button>
              </div>
            </div>
          </div>
        )}

        {/* ADD VISITOR */}
        {showVisitor && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex justify-center items-center z-[100] p-4">
            <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-md border border-slate-700">
              <h2 className="text-2xl font-serif font-bold mb-6 text-white">Visitor Authorization</h2>
              <div className="space-y-4">
                <input className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700" placeholder="Target Inmate ID" value={visitorForm.prisonerId} onChange={e => setVisitorForm({...visitorForm, prisonerId: e.target.value})}/>
                <input className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700" placeholder="Visitor Full Name" value={visitorForm.name} onChange={e => setVisitorForm({...visitorForm, name: e.target.value})}/>
                <input className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700" placeholder="Relationship" value={visitorForm.relation} onChange={e => setVisitorForm({...visitorForm, relation: e.target.value})}/>
                <input type="date" className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700" value={visitorForm.date} onChange={e => setVisitorForm({...visitorForm, date: e.target.value})}/>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setShowVisitor(false)} className="flex-1 bg-slate-800 py-3 rounded-xl font-bold">ABORT</button>
                <button onClick={handleAddVisitor} className="flex-1 bg-white py-3 rounded-xl font-bold text-slate-950">GRANT ENTRY</button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW INMATE PROFILE */}
        {viewInmate && (
          <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl flex justify-center items-center z-[200] p-4">
            <div className="bg-slate-900 p-10 rounded-[2.5rem] w-full max-w-3xl border border-slate-700 relative shadow-2xl overflow-hidden">
              <button onClick={() => setViewInmate(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
                <lord-icon src="https://cdn.lordicon.com/nhfyhjtj.json" trigger="hover" stroke="bold" colors="primary:#ffffff" style={{ width: "32px", height: "32px" }} />
              </button>

              <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
                <div className="relative">
                    <div className="w-48 h-56 bg-slate-800 rounded-3xl border-2 border-slate-700 flex items-center justify-center text-slate-600 shadow-inner overflow-hidden">
                        <lord-icon src="https://cdn.lordicon.com/kdduutun.gif" trigger="loop" delay="2000" style={{ width: "100px", height: "100px" }} />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-4 border-slate-900">
                        SECURE_FILE
                    </div>
                </div>

                <div className="flex-1 space-y-8">
                  <div>
                    <h2 className="text-5xl font-serif tracking-tighter mb-2 leading-none">{viewInmate.name}</h2>
                    <p className="text-blue-400 font-mono tracking-widest">ID_ENTRY: {viewInmate.prisonerId}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Legal Status</p>
                        <p className="font-bold text-xl text-slate-200">{viewInmate.status}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Containment</p>
                        <p className="font-bold text-xl text-slate-200">CELL: {viewInmate.cell}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Main Offense</p>
                        <p className="font-bold text-slate-200 leading-tight">{viewInmate.crime}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Time Elapsed</p>
                        <p className="font-bold text-xl text-blue-500">{daysInJail(viewInmate.entryDate)} Days</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex gap-4">
                    <button className="flex-1 bg-slate-800 py-3 rounded-2xl text-xs font-bold border border-slate-700">PRINT DOSSIER</button>
                    <button onClick={() => setViewInmate(null)} className="flex-1 bg-blue-600 py-3 rounded-2xl text-xs font-bold">CLOSE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Inmates;