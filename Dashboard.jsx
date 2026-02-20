import React, { useState } from "react";
import Layout from "./Layout";
import PrisonerList from "./PrisonerList";
import AddPrisoner from "./AddPrisoner";
import DashStaff from "./DashStaff";
import Quick from "./Quick";

const Dashboard = () => {
  const [prisoners, setPrisoners] = useState([]);
  const [isLockdown, setIsLockdown] = useState(false); // 🔒 NEW

  const addPrisoner = (newPrisoner) => {
    setPrisoners((prev) => [...prev, newPrisoner]);
  };

  const deletePrisoner = (id) => {
    if (!window.confirm("Are you sure you want to delete this prisoner?")) return;
    setPrisoners((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Layout>
      
      {/* 🔴 LOCKDOWN OVERLAY (DOES NOT TOUCH STRUCTURE) */}
      {isLockdown && (
        <div className="fixed inset-0 z-30 pointer-events-none">
          <div className="absolute inset-0 bg-red-950/40 animate-pulse" />
        </div>
      )}

      {/* ✅ ONE ROW */}
      <div className="p-8 grid grid-cols-3 gap-6 bg-slate-950 border border-blue-500 rounded-2xl relative">

        {/* COLUMN 1 */}
        <PrisonerList
          prisoners={prisoners}
          onDelete={deletePrisoner}
        />

        {/* COLUMN 2 */}
        <AddPrisoner onAdd={addPrisoner} />

        {/* COLUMN 3 (STACKED) */}
        <div className="flex flex-col gap-4">
          <DashStaff />
        </div>

        <Quick
          isLockdown={isLockdown}
          onLockdownToggle={setIsLockdown}
        />

        {/* 🔥 OPTIONAL STATUS TAG */}
        {isLockdown && (
          <div className="absolute top-3 right-6 z-40">
            <span className="bg-red-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">
              LOCKDOWN ACTIVE
            </span>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Dashboard;
