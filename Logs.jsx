import React, { useState } from "react";
import { Clock } from "lucide-react";
import Layout from "./Layout";

export default function Logs() {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const logs = [
    {
      id: 1,
      type: "INMATE",
      message: "New inmate added: Rahul Verma",
      time: "10:32 AM",
      date: "21 Jan 2026",
      badge: "ID-8829",
    },
    {
      id: 2,
      type: "STAFF",
      message: "Staff duty updated: Guard A → Night Shift",
      time: "09:10 AM",
      date: "21 Jan 2026",
      badge: "ADM-04",
    },
    {
      id: 3,
      type: "SYSTEM",
      message: "Admin login successful",
      time: "08:55 AM",
      date: "21 Jan 2026",
      badge: "SYS-LOG",
    },
  ];

  const filteredLogs = logs.filter(
    (log) =>
      (filter === "ALL" || log.type === filter) &&
      log.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 text-white border border-blue-500 rounded-2xl">
        <div className="p-8 min-h-screen mx-auto">

          {/* ================= HEADER ================= */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase font-serif mb-1">
                System Audit Trail
              </h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-600"></span>
                Monitoring & Security Events
              </p>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard className="border border-white" label="Total Logs" value={logs.length} color="blue" />
            <StatCard className="border border-white" label="Inmate Events" value={logs.filter(l => l.type === "INMATE").length} color="emerald" />
            <StatCard className="border border-white" label="Staff Actions" value={logs.filter(l => l.type === "STAFF").length} color="purple" />
            <StatCard className="border border-white" label="System Alerts" value={logs.filter(l => l.type === "SYSTEM").length} color="red" />
          </div>

          {/* ================= TABLE CONTAINER ================= */}
          <div className="bg-slate-900 border border-blue-500 rounded-[2.5rem] shadow-2xl p-6">

            {/* Search + Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search audit logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 px-6 py-4 rounded-2xl outline-none focus:border-blue-500 transition-all"
              />

              <div className="flex gap-2">
                {["ALL", "INMATE", "STAFF", "SYSTEM"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`px-6 py-3 rounded-2xl text-xs font-black tracking-widest transition-all
                      ${
                        filter === item
                          ? "bg-blue-600 text-white"
                          : "bg-slate-950 border border-slate-800 text-slate-500 hover:text-white"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                  <tr>
                    <th className="p-4">Event</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Reference</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-20 text-center opacity-30">
                        <p className="text-xl font-black uppercase tracking-widest">
                          No audit records found
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-slate-800/40 transition-all"
                      >
                        <td className="p-4 font-medium text-slate-100">
                          {log.message}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                              ${
                                log.type === "INMATE" &&
                                "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              }
                              ${
                                log.type === "STAFF" &&
                                "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              }
                              ${
                                log.type === "SYSTEM" &&
                                "bg-red-500/10 text-red-400 border border-red-500/20"
                              }`}
                          >
                            {log.type}
                          </span>
                        </td>

                        <td className="p-4 text-slate-500 font-mono text-xs">
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            {log.time} • {log.date}
                          </div>
                        </td>

                        <td className="p-4 font-mono text-blue-400 text-xs">
                          {log.badge}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-14 text-center">
            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              End of audit stream // Secure Monitoring Node
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* ================= SMALL REUSABLE STAT CARD ================= */
const StatCard = ({ label, value, color, className = "" }) => (
  <div
    className={`bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl ${className}`}
  >
    <p className={`text-${color}-400/80 text-[10px] uppercase font-black tracking-widest mb-1`}>
      {label}
    </p>
    <p className={`text-4xl font-black text-${color}-400`}>
      {value}
    </p>
  </div>
);
