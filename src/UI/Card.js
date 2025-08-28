// src/UI/Card.js
import React from "react";
import { Card as BootstrapCard, Button } from "react-bootstrap";

/**
 * Reusable Card component
 *
 * Props:
 *  - title: string, card title
 *  - body: string or React node, card content
 *  - footer: string or React node, optional footer content
 *  - actions: array of objects { text, onClick, variant } for buttons
 *  - image: string, optional image URL at top
 */
export default function Card({ title, body, footer, actions = [], image }) {
    return (
        <BootstrapCard className="mb-3">
            {image && <BootstrapCard.Img variant="top" src={image} />}
            {title && <BootstrapCard.Header>{title}</BootstrapCard.Header>}
            <BootstrapCard.Body>
                {body}
                {actions.length > 0 && (
                    <div className="mt-3">
                        {actions.map((action, index) => (
                            <Button
                                key={index}
                                variant={action.variant || "primary"}
                                onClick={action.onClick}
                                className="me-2"
                            >
                                {action.text}
                            </Button>
                        ))}
                    </div>
                )}
            </BootstrapCard.Body>
            {footer && <BootstrapCard.Footer>{footer}</BootstrapCard.Footer>}
        </BootstrapCard>
    );
}
