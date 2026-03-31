import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Inmates from "./components/Inmates";
import Staff from "./components/Staff";
import Logs from "./components/Logs";
import Facilities from "./components/Facilities";
import Pulse from "./components/Pulse";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inmates" element={<Inmates />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/logs" element={<Logs />} />
      <Route path="/Facilities" element={<Facilities />} />
      <Route path="/pulse" element={<Pulse />} />
    </Routes>
  );
}

export default App;
