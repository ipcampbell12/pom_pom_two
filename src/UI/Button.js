// src/UI/Button.js
import React from "react";
import { Button as BootstrapButton, Spinner } from "react-bootstrap";

/**
 * Reusable Button component
 *
 * Props:
 *  - variant: string, Bootstrap variant (default: "primary")
 *  - children: string or React node
 *  - onClick: function, click handler
 *  - isLoading: boolean, show spinner inside button
 *  - disabled: boolean, disable button
 *  - type: "button" | "submit" | "reset" (default: "button")
 */
export default function Button({ variant = "primary", children, onClick, isLoading = false, disabled = false, type = "button" }) {
    return (
        <BootstrapButton variant={variant} onClick={onClick} disabled={disabled || isLoading} type={type}>
            {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />}
            {children}
        </BootstrapButton>
    );
}
