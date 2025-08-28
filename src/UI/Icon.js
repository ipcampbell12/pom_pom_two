// src/UI/Icon.js
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Icon({ name, size = 1, className = "" }) {
    return <i className={`bi-${name} fs-${size} ${className}`}></i>;
}
