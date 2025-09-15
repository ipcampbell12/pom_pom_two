import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import AlertMessage from "../UI/Alert";
import { onSuccess, onFailure } from "../Utilities/AlertHelpers";
import { Spinner } from "react-bootstrap";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertConfig, setAlertConfig] = useState(null);

    // Define the header indexes for readability
    const USERNAME = 0;
    const EMAIL = 1;
    const DOB = 2;
    const GENDER = 3;
    const USERTYPE = 4;
    const TIMESTAMP = 5;

    useEffect(() => {
        google.script.run
            .withSuccessHandler((data) => {
                console.log("Data from GAS:", data);
                setUsers(JSON.parse(data) || []);
                setLoading(false);
                setAlertConfig(onSuccess("Loaded users successfully!", () => setAlertConfig(null)));
            })
            .withFailureHandler((err) => {
                setAlertConfig(onFailure(err.message, () => setAlertConfig(null)));
                setLoading(false);
            })
            .getAllUsers();
    }, []);

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }

    return (
        <div className="container mt-4">
            {alertConfig && <AlertMessage {...alertConfig} />}
            {users.length === 0 && <p>No users found.</p>}
            {users.map((user, index) => (
                <Card
                    key={index}
                    title={user[USERNAME] || "Unnamed User"}
                    body={
                        <div>
                            <p><strong>Email:</strong> {user[EMAIL]}</p>
                            <p><strong>DOB:</strong> {user[DOB]}</p>
                            <p><strong>Gender:</strong> {user[GENDER]}</p>
                            <p><strong>User Type:</strong> {user[USERTYPE]}</p>
                            <p><strong>Timestamp:</strong> {user[TIMESTAMP]}</p>
                        </div>
                    }
                    actions={[
                        { text: "Delete", variant: "danger", onClick: () => console.log("Delete", user) },
                        { text: "Edit", variant: "secondary", onClick: () => console.log("Edit", user) },
                    ]}
                />
            ))}
        </div>
    );
}
