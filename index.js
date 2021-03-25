const express = require('express');
const bodyParser = require('body-parser');
const todoRoute = require('./todo');
const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.Router().get('/', (req, res) => res.json({ ok: true })));

app.use('/todos', todoRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
