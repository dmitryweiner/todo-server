const express = require('express');
const db = require('../db').getDb().get('todos');
const router = express.Router();

let isAuth = false;
let useAuth = false;

router.get('/', (req, res, next) => {
    res.json({ isAuth });
});

router.post('/', (req, res, next) => {
    if (req.body.username !== 'admin' || req.body.password !== '123') {
        const error = new Error('Authentication failed');
        error.status = 401;
        return next(error);
    }

    isAuth = true;

    res.json({ isAuth });
});

router.delete('/', (req, res, next) => {
    isAuth = false;

    res.json({ isAuth });
});

function setUseAuth(newValue) {
    useAuth = newValue;
}

function getUseAuth() {
    return useAuth;
}

function getIsAuth() {
    return isAuth;
}

module.exports = {
    router,
    getIsAuth,
    getUseAuth,
    setUseAuth
};
