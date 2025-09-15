import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import PublicLandingPage from "../Components/PublicLandingPage";
import NewUserForm from "../Components/NewUserForm";
import HomePage from "./Components/Home";
import AdminDashboard from "./Components/AdminDashboard";
import { AuthProvider, useAuth } from "./Context/AuthContext";

function AppRoutes() {
    const { user } = useAuth();

    return (
        <Routes>
            {!user ? (
                <>
                    <Route path="/" element={<PublicLandingPage />} />
                    <Route path="/new-user" element={<NewUserForm />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<HomePage />} />
                    {user.isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
                </>
            )}
        </Routes>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}
