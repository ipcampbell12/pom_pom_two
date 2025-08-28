// src/UI/CustomModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * Reusable Modal component
 *
 * Props:
 *  - show: boolean, whether the modal is visible
 *  - title: string, modal header title
 *  - body: string or React node, modal content
 *  - onClose: function, called when modal is closed
 *  - onConfirm: function, called when confirm button is clicked
 *  - confirmText: string, text for confirm button (default: "Confirm")
 *  - cancelText: string, text for cancel button (default: "Cancel")
 *  - size: "sm" | "lg" | "xl" (optional, default: undefined)
 */
export default function CustomModal({
    show,
    title,
    body,
    onClose,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
    size
}) {
    return (
        <Modal show={show} onHide={onClose} size={size}>
            {title && (
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
            )}
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    {cancelText}
                </Button>
                {onConfirm && (
                    <Button variant="primary" onClick={onConfirm}>
                        {confirmText}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
