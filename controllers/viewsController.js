exports.getLandingPAge = async (req, res) => {
    res.status(200).render('allLoans', {
        title: `Get All Loans`
    });
};
exports.getAllLoans = async (req, res) => {
    res.status(200).render('allLoans', {
        title: `Get All Loans`
    });
};
