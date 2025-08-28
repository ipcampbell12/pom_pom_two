// src/UI/Spinner.js
import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

/**
 * Reusable Spinner
 *
 * Props:
 *  - size: "sm" | undefined (default: undefined)
 *  - animation: "border" | "grow" (default: "border")
 *  - role: string (default: "status")
 */
export default function Spinner({ size, animation = "border", role = "status" }) {
    return (
        <BootstrapSpinner animation={animation} size={size} role={role}>
            <span className="visually-hidden">Loading...</span>
        </BootstrapSpinner>
    );
}
