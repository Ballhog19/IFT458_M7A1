const Loan = require('../models/loanModel');


exports.getLandingPAge = async (req, res) => {
    res.status(200).render('landingPage', {
        title: `Home Page`
    });
};

exports.getAllLoans = async (req, res) => {
    res.status(200).render('allLoans', {
        title: `Get All Loans`
    });
};

exports.login = async (req, res) => {
    res.status(200).render('login', {
        title: 'Login'
    });
};

exports.signUp = async (req, res) => {
    res.status(200).render('signUp', {
        title: 'New User Signup'
    });
};

exports.currentUser = async (req, res) => {
    const user = req.user
    res.status(200).render('user', {
        title: 'User',
        user: user,
        loans: await Loan.find({"customerName": user.name})
    });
};
