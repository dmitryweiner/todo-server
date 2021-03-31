const express = require('express');
const { nanoid } = require('nanoid');
const db = require('./db').getDb().get('todos');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json(db.value());
});

router.post('/', (req, res, next) => {
    // check if empty
    if (req.body.title === undefined || typeof req.body.title !== 'string' || req.body.title.length === 0) {
        const error = new Error('No title provided');
        error.status = 400;
        return next(error);
    }

    // check if exists
    if (db.find({title: req.body.title}).value()) {
        const error = new Error('This item already exists');
        error.status = 400;
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

    if (db.find({title: req.body.title}).value()) {
        const error = new Error('This item already exists');
        error.status = 400;
        return next(error);
    }

    item.title = "" + req.body.title;
    item.isChecked = !!req.body.isChecked; // forgive me

    db.find({id: item.id}).assign(item).write();
    res.json(item);
});

module.exports = router;