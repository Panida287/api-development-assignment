import { API_LOGIN } from '../../api/constants.js';

export async function login(username, password) {
    const errorContainer = document.querySelector(".error-msg");

    try {
        const response = await fetch(API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Login failed');
        }

        if (result?.username) {
            localStorage.setItem('username', result.username);
            localStorage.setItem('accessToken', result.accessToken);
        }

        return result;
    } catch (error) {
        console.error("Error during login", error);
        errorContainer.innerHTML = (error);
    }
}
