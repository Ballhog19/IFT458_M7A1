const path = require('path');
const express = require('express');
const morgan = require('morgan');
const pug = require('pug');
var bodyParser = require('body-parser')
const jsonwebtoken = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const viewRouter = require('./routes/viewRoutes');
const loanRouter = require('./routes/loanRoutes');
const userRouter = require('./routes/userRoutes');


const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser())


app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'jwt') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
})

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/loans', loanRouter)
app.use ('/api/v1/users', userRouter)

module.exports = app;
