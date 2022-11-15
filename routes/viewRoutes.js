const express = require('express');
const viewsController = require('../controllers/viewsController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewsController.getLandingPAge);
router.route('/AllLoans')
    .get(authController.isLoggedIn, viewsController.getAllLoans);
router.get('/login', viewsController.login);
router.get('/signup', viewsController.signUp);
router.route('/user')
    .get(authController.protect,authController.isLoggedIn, viewsController.currentUser);



module.exports = router;
