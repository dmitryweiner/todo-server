const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db').initDb();
const todosRoute = require('./routes/todos');
const { router: authRoute, setUseAuth, getUseAuth } = require('./routes/auth');
const { getRandomError, shouldDropConnection, unpredictableDelay } = require('./randomError');
const router = express.Router();
const app = express();
setUseAuth(process.argv[2] === 'useAuth');

app.use(
    cors({
        credentials: true,
        origin: true
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
    unpredictableDelay(() => {
        if (shouldDropConnection()) {
            return res.connection.end();
        }

        const error = getRandomError(res);
        if (error) {
            return next(error);
        }
        next();
    });
});

app.use(express.Router().get('/', (req, res) => res.json({ ok: true })));

app.use('/todos', todosRoute);
app.use('/auth', authRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err.message });
});

const PORT = process.env.PORT || 3001;

console.log('Starting server...');

if (getUseAuth()) {
    console.log('Authentication enabled.');
} else {
    console.log('Use useAuth parameter to enable authentication.');
}

app.listen(PORT, '0.0.0.0', () => console.log(`Server is live at http://localhost:${PORT}`));
