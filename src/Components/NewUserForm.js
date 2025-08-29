// src/components/NewUserForm.js
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { submitUserForm } from "../ApiCalls";
import { Button, FormInput } from "../UI"; // use your reusable components

export default function NewUserForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        category: ""
    });

    const categories = ["Admin", "User", "Host"]; // example options

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
                alert("Form submitted!");
            },
            (error) => {
                console.error("Error:", error);
                alert("Something went wrong.");
            }
        );
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* Username */}
            <FormInput
                label="Username"
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />

            {/* Email */}
            <FormInput
                label="Email"
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />

            {/* Password */}
            <FormInput
                label="Password"
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />

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
