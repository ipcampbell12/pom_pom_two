// src/Components/HomePage.jsx
import React from "react";
import { useAuth } from "../Context/AuthContext";

export default function HomePage() {
    const { user, logout } = useAuth();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome, {user.username}!</h1>
            <p>You are now logged in.</p>
            <button onClick={logout}>Log Out</button>
        </div>
    );
}
