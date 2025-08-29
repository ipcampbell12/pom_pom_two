// src/ApiCalls.js

// Submit new user form data to Apps Script
export function submitUserForm(formData, onSuccess, onError) {
    google.script.run
        .withSuccessHandler(onSuccess)
        .withFailureHandler(onError)
        .addUser(formData); // `addUser` is the server-side Apps Script function
}

// Read all users (for internal dashboard)
export function getUsers(onSuccess, onError) {
    google.script.run
        .withSuccessHandler(onSuccess)
        .withFailureHandler(onError)
        .getUsers(); // server-side function
}

// Update user data
export function updateUser(userData, onSuccess, onError) {
    google.script.run
        .withSuccessHandler(onSuccess)
        .withFailureHandler(onError)
        .updateUser(userData); // server-side function
}
