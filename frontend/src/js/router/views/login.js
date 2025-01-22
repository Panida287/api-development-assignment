import { onLogin } from '../../ui/auth/login.js';

const form = document.getElementById('login-form');

form.addEventListener('submit', onLogin);

