import { register } from '../../api/auth/register.js';

export async function onRegister(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const errorContainer = document.querySelector('.error-msg');

    if (password !== repeatPassword) {
        errorContainer.innerHTML = ('Passwords do not match');
        throw new Error('Passwords do not match');
    }

    const regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(username)) {
        errorContainer.innerHTML = ('Username should not contain space or special characters');
        return;
    }

    try {
        const result = await register(username, password);

        if (result.username) {
            alert('successfully registered!');
            return window.location.href = '/auth/login/';
        }
    } catch (error) {
        errorContainer.innerHTML = error.message;
    }
}

