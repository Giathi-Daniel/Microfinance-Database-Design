const express = require('express');
const { body, param } = require('express-validator');
const loanController = require('../controllers/loanController');

const router = express.Router();

// Route to apply for a loan
router.post(
    '/',
    [
        body('user_id').isInt().withMessage('User ID must be an integer'),
        body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
        body('interest_rate').isFloat({ gt: 0 }).withMessage('Interest rate must be greater than 0'),
        body('status').optional().isIn(['pending', 'approved', 'declined', 'closed']).withMessage('Invalid status'),
    ],
    loanController.applyLoan
);

// Route to get loan details by ID
router.get(
    '/:id',
    [param('id').isInt().withMessage('Loan ID must be an integer')],
    loanController.getLoanById
);

// Route to update loan status
router.put(
    '/:id/status',
    [
        param('id').isInt().withMessage('Loan ID must be an integer'),
        body('status').isIn(['pending', 'approved', 'declined', 'closed']).withMessage('Invalid status'),
    ],
    loanController.updateLoanStatus
);

module.exports = router;
