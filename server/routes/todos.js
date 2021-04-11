const express = require('express');
const { nanoid } = require('nanoid');
const db = require('../db').getDb().get('todos');
const router = express.Router();
const { getIsAuth, getUseAuth } = require('./auth');

router.all('*', function(req, res, next) {
    if (getUseAuth() && !getIsAuth()) {
        const error = new Error('Not authorized');
        error.status = 403;
        return next(error);
    }
    next();
});

router.get('/', (req, res, next) => {
    res.json(db.value());
});

router.get('/:id', (req, res, next) => {
    let item = db.find({id: req.params.id}).value();

    if (!item) {
        const error = new Error('Item not found');
        error.status = 404;
        return next(error);
    }

    res.json(item);
});

router.post('/', (req, res, next) => {
    const error = validateTodo({title: req.body.title});
    if (error) {
        return next(error);
    }

    const newItem = {
        id: nanoid(),
        title: req.body.title,
        isChecked: false
    }
    db.push(newItem).write();
    res.json(newItem);
});

router.put('/:id', (req, res, next) => {
    let item = db.find({id: req.params.id}).value();

    if (!item) {
        const error = new Error('Item not found');
        error.status = 404;
        return next(error);
    }

    if (req.body.title !== undefined) {
        const error = validateTodo({title: req.body.title});
        if (error) {
            return next(error);
        }
        item.title = "" + req.body.title;
    }

    if (req.body.isChecked !== undefined) {
        item.isChecked = !!req.body.isChecked; // forgive me
    }

    db.find({id: item.id}).assign(item).write();
    res.json(item);
});

router.delete('/:id', (req, res, next) => {
    let item = db.find({id: req.params.id}).value();

    if (!item) {
        const error = new Error('Item not found');
        error.status = 404;
        return next(error);
    }

    db.remove({id: item.id}).write();
    res.json(item);
});

function validateTodo({title}) {
    let error;
    if (title === undefined || typeof title !== 'string' || title.length === 0) {
        error = new Error('No title provided');
        error.status = 400;
    }

    if (db.find({title}).value()) {
        error = new Error('This item already exists');
        error.status = 400;
    }
    return error;
}

module.exports = router;