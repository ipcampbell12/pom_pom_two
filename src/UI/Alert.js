// src/UI/AlertMessage.js
import React, { useEffect } from "react";
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
    useEffect(() => {
        // hardcoded 3 second timeout
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <Alert variant={variant} dismissible={dismissible} onClose={onClose}>
            {message}
        </Alert>
    );
}
