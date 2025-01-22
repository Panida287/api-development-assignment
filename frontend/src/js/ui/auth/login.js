import { login } from '../../api/auth/login.js'

export async function onLogin(event) {
    event.preventDefault();

    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    const result = await login(formData);

    if (result.data.username) {
        console.log(result.data.username);
    }
}