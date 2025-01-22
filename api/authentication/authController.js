require('dotenv').config();
console.log('Loaded refresh SECRET:', process.env.REFRESH_SECRET);

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signUp = async (req, res) => {
    const { username, password } = req.body;

    if (!username || username.trim() === '') {
        return res.status(400).json({ message: 'Username is required' });
    }
    if (!password || password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            password: hashedPassword,
            refreshToken: []
        });

        await newUser.save();
        res.status(201).json({ message: 'User successfully signed up',
            username: newUser.username
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username})
        if (!user) return res.status(401).send({ message:'Invalid username'});

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).send({ message:'Invalid username'});

        const accessToken = jwt.sign({ username }, process.env.SECRET, { expiresIn: '15m'});
        const refreshToken = jwt.sign({ username }, process.env.REFRESH_SECRET);

        user.refreshTokens.push(refreshToken);
        await user.save()

        res.status(200).json({ username, accessToken, refreshToken });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).send({ message:'No token provided'});

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

        const user = await User.findOne({ username: decoded.username });
        if (!user || !user.refreshTokens.includes(token)) {
            return res.status(403).send({ message:'Invalid token'});
        }

        const newToken = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: '15m' });

        res.json({ accessToken: newToken });
    } catch (err) {
        res.status(403).send({ message: err.message });
    }
}

exports.logout = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).send({ message:'No token provided'});

    try {
        const user = await User.findOneAndUpdate(
            { refreshTokens: token },
            { $pull: { refreshTokens: token } },
            { new: true }
        );
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};