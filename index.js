const express = require('express');
const bodyParser = require('body-parser');
require('./db').initDb();
const todosRoute = require('./todos');
const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.Router().get('/', (req, res) => res.json({ ok: true })));

app.use('/todos', todosRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => console.log(`Server is live at http://localhost:${PORT}`));
