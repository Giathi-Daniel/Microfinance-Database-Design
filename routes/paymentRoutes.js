const express = require('express');
const { body, param } = require('express-validator');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Route to add a payment
router.post(
    '/',
    [
        body('loan_id').isInt().withMessage('Loan ID must be an integer'),
        body('amount_paid').isFloat({ gt: 0 }).withMessage('Amount paid must be greater than 0'),
    ],
    paymentController.addPayment
);

// Route to get payment history for a specific loan
router.get(
    '/loan/:loan_id',
    [param('loan_id').isInt().withMessage('Loan ID must be an integer')],
    paymentController.getPaymentsByLoanId
);

module.exports = router;
