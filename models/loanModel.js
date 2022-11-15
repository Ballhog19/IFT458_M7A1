const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
    {
        loanId: {
            type: Number,
            required: true,
            unique: true,
            min: [2, 'LoanId must be minimum 2 digits']
        },
        customerName: {
            type: String,
            required: [true, 'Customer name must be provided'],
            unique: false,
            trim: true,
            maxLength: [40, 'Name must be less than 40 characters'],
            minLength: [5, 'Name must be at least 5 characters']
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone number is required'],
            unique: false,
            trim: true
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
            trim: true,
            unique: false,
        },
        loanAmount: {
            type: Number,
            required: [true, 'Loan must have a value'],
            unique: false,
            min: [1, 'Loan must be at least $1']
        },
        interest: {
            type: Number,
            require: [true, 'Loan must have an interest value'],
            unique: false,
            min: [0, 'Interest rate must be non-negative']
        },
        loanTermYears: {
            type: Number,
            required: [true, 'Loan Term is required'],
            unique: false
        },
        loanType: {
            type: String,
            required: false,
            trim: true,
            unique: false
        },
        description: {
            type: String,
            required: false,
            unique: false,
            maxLength: [100, 'Maximum lenght of 100 characters']
        }
    });

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;