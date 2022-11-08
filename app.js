const path = require('path');
const express = require('express');
const morgan = require('morgan');
const pug = require('pug');
var bodyParser = require('body-parser')
const data = require('../Modules/data/data.json')


const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/getAllLoans', (req, res)=>{
    res.status(200).render('allLoans',{
        data: data
    });
})
app.use('/', viewRouter);

module.exports = app;
