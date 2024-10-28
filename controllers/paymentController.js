const db = require('../config/db');
const { validationResult } = require('express-validator');

// Add a Payment
exports.addPayment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { loan_id, amount_paid } = req.body;
    db.query(
        'INSERT INTO payments (loan_id, amount_paid) VALUES (?, ?)',
        [loan_id, amount_paid],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error', details: err });
            res.status(201).json({ message: 'Payment recorded', paymentId: results.insertId });
        }
    );
};

// Get Payment History for a Loan
exports.getPaymentsByLoanId = async (req, res) => {
    const { loan_id } = req.params;
    db.query('SELECT * FROM payments WHERE loan_id = ?', [loan_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });
        res.status(200).json(results);
    });
};


