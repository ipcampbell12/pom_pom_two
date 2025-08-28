
// src/UI/ToastMessage.js
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastMessage({ show, message, onClose, delay = 3000 }) {
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast show={show} onClose={onClose} delay={delay} autohide>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
