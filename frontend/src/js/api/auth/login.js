import {API_LOGIN} from '../../api/constants.js';

export async function login(username, password) {
    const errorContainer = document.querySelector(".error-msg");

    try {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const response = await fetch(API_LOGIN, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ username, password}),
        });

        const result = await response.json();

        if (!response.ok) {
            errorContainer.innerHTML = result.errors?.[0]?.error?.message;
        }

        if (result.data?.username) {
            localStorage.setItem('username', result.data?.username);
            localStorage.setItem('accessToken', result.data.accessToken);
            localStorage.setItem('accessToken', result.data.refreshToken);
        }

        return result;

    } catch (error) {
        console.error("Error during login", error);
        errorContainer.innerHTML = error;
    }
}