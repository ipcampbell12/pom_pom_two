import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // null if not logged in

    const login = (username, password) => {
        // We'll call your GAS API here
        return fetch(
            `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?username=${username}&password=${password}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUser({ username: username, isAdmin: data.isAdmin });
                    return true;
                } else {
                    return false;
                }
            });
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
