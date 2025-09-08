import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormExample from "./Forms/FormExample";
import AdminDashboard from "./Admin/AdminDashboard";
import NavBar from "./UI/NavBar";

export default function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<FormExample />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}
