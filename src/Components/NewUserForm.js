// src/components/NewUserForm.js
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "../UI"; // <-- import your reusable Button component

export default function NewUserForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        category: ""
    });

    const categories = ["Admin", "User", "Host"]; // example options

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
        console.log("Form submitted:", formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* Username */}
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </Form.Group>

            {/* Category Dropdown */}
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

            {/* Submit Button */}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
