import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import AlertMessage from "../UI/Alert";
import { onSuccess, onFailure } from "../Utilities/AlertHelpers";
import { Spinner } from "react-bootstrap";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertConfig, setAlertConfig] = useState(null);

    useEffect(() => {
        google.script.run
            .withSuccessHandler((data) => {
                setUsers(data);
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
                    title={user.Username || "Unnamed User"}
                    body={
                        <div>
                            <p><strong>Email:</strong> {user.Email}</p>
                            <p><strong>DOB:</strong> {user.DOB}</p>
                            <p><strong>Gender:</strong> {user.Gender}</p>
                            <p><strong>User Type:</strong> {user.UserType}</p>
                            <p><strong>Timestamp:</strong> {user.Timestamp}</p>
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
