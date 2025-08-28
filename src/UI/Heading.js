// src/UI/Heading.js
import React from "react";

export default function Heading({ level = 1, children, className = "" }) {
    const Tag = `h${level}`;
    return <Tag className={`mb-3 ${className}`}>{children}</Tag>;
}
