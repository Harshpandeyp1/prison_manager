import React, { useState } from "react";

const PrisonerList = ({ prisoners = [], onDelete }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-slate-900/50 border border-blue-500 p-6 h-[500px] flex flex-col rounded-2xl">
      <h2 className="text-slate-500 text-lg font-bold uppercase mb-4">
        Prisoner List
      </h2>

      <div className="overflow-y-auto space-y-3">
        {prisoners.length === 0 && (
          <p className="text-center text-slate-500 mt-10 uppercase">
            No Prisoners Found
          </p>
        )}

        {prisoners.map((p) => (
          <div
            key={p.id}
            className="bg-slate-800 border border-slate-700 p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="text-white font-semibold">
                {p.name} <span className="text-slate-400 text-sm">#{p.id}</span>
              </p>
              <p className="text-xs text-slate-400">
                Status:{" "}
                <span className={p.status === "Convicted" ? "text-red-400" : "text-yellow-400"}>
                  {p.status}
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelected(p)}
                className="border border-blue-400 text-blue-300 px-3 py-1 rounded"
              >
                View
              </button>

              <button
                onClick={() => onDelete(p.id)}
                className="border border-red-400 text-red-400 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔍 VIEW MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-slate-900 border border-slate-700 p-6 w-[350px] rounded">
            <h3 className="text-blue-300 font-bold mb-3 uppercase">
              Prisoner Details
            </h3>
            <div className="text-white">
            <p><b>ID:</b> {selected.id}</p>
            <p><b>Name:</b> {selected.name}</p>
            <p><b>Age:</b> {selected.age}</p>
            <p><b>Crime:</b> {selected.crime}</p>
            <p><b>Sentence:</b> {selected.sentence || "N/A"}</p>
            <p><b>Status:</b> {selected.status}</p>
              </div>
            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full bg-red-500 py-2 uppercase font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrisonerList;
