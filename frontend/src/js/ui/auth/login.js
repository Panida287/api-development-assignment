import { login } from '../../api/auth/login.js';

export async function onLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const errorContainer = document.querySelector('.error-msg');

    try {
        const result = await login(username, password);

        if (result?.username) {
            window.location.href = '/';
        }
    } catch (error) {
        errorContainer.innerHTML = error.message;
    }
}

