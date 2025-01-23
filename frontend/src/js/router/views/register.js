import { onRegister } from '../../ui/auth/register.js';

const form = document.getElementById('register-form');

form.addEventListener('submit', onRegister);
