const Loan = require('../models/loanModel');

exports.getAllLoans = async (req, res, next) => {
    const loans = await Loan.find();

    res.status(200).render('allLoans', {
        title: `Get All Loans`,
        loans: loans
    });
};

exports.createManyLoans = async (req, res,) => {
    try {
        const loans = await Loan.insertMany(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                loans
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
