import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Repository from "../pages/Repository";

const RoutesApp: React.FC = () => (
    <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/repository/:author/:repository" element={<Repository/>} />
    </Routes>
)
export default RoutesApp;