const express = require('express');
const loanController = require('../controllers/loanController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(authController.isLoggedIn, authController.protect, loanController.getAllLoans)

router
    .route('/multi')
    .post(loanController.createManyLoans)

module.exports = router;
