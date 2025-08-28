// src/UI/FormInput.js
import React from "react";
import { Form } from "react-bootstrap";

/**
 * Reusable Form Input
 *
 * Props:
 *  - label: string, input label
 *  - type: string, input type (default: "text")
 *  - value: string
 *  - onChange: function, input change handler
 *  - placeholder: string
 *  - error: string, error message to display
 *  - name: string, input name
 */
export default function FormInput({ label, type = "text", value, onChange, placeholder, error, name }) {
    return (
        <Form.Group className="mb-3" controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                isInvalid={!!error}
                name={name}
            />
            {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
        </Form.Group>
    );
}
