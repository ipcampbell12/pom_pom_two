// src/UI/AlertMessage.js
import React from "react";
import { Alert } from "react-bootstrap";

/**
 * Reusable Alert component
 *
 * Props:
 *  - variant: "primary" | "success" | "danger" | "warning" | "info" (default: "info")
 *  - message: string or React node
 *  - dismissible: boolean (default: true)
 *  - onClose: function callback when alert is closed
 */
export default function AlertMessage({ variant = "info", message, dismissible = true, onClose }) {
    return (
        <Alert variant={variant} dismissible={dismissible} onClose={onClose}>
            {message}
        </Alert>
    );
}
