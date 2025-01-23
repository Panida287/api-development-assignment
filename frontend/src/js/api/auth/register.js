import { API_REGISTER } from '../../api/constants.js';

export async function register( username, password ) {
    const errorContainer = document.querySelector(".error-msg");

    try {
        const response = await fetch(API_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Register failed');
        }

        return result;
    } catch (error) {
        console.error("Error during register", error);
        errorContainer.innerHTML = (error);
    }
}
