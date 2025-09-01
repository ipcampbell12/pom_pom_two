// src/components/NewUserForm.js
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { submitUserForm } from "../ApiCalls";
import { Button, FormInput, AutoDismissAlert } from "../UI"; // include AutoDismissAlert

export default function NewUserForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        category: ""
    });

    const [alert, setAlert] = useState(null); // { variant: "success" | "danger", message: "" }

    const categories = ["Admin", "User", "Host"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitUserForm(
            formData,
            (response) => {
                console.log("Success:", response);
                setAlert({ variant: "success", message: "Form submitted successfully!" });

                // Optional: reset form
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    category: ""
                });
            },
            (error) => {
                console.error("Error:", error);
                setAlert({ variant: "danger", message: "Something went wrong." });
            }
        );
    };

    return (
        <>
            {/* Render alert if present */}
            {alert && <AutoDismissAlert variant={alert.variant} message={alert.message} />}

            <Form onSubmit={handleSubmit}>
                <FormInput
                    label="Username"
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <FormInput
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <FormInput
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}
