// src/utils/alertHelpers.js
export function onSuccess(message, onClose) {
    return {
        variant: "success",
        message,
        dismissible: true,
        onClose,
    };
}

export function onFailure(message, onClose) {
    return {
        variant: "danger",
        message,
        dismissible: true,
        onClose,
    };
}