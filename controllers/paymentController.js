const db = require('../config/db');
const { validationResult } = require('express-validator');

// Add a Payment
exports.addPayment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { loan_id, amount_paid } = req.body;

    // Check if loan_id exists in loans table
    db.query('SELECT * FROM loans WHERE loan_id = ?', [loan_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid loan_id. Loan does not exist.' });
        }

        // Insert payment if loan_id exists
        db.query(
            'INSERT INTO payments (loan_id, amount_paid) VALUES (?, ?)',
            [loan_id, amount_paid],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error', details: err });
                }
                res.status(201).json({ message: 'Payment recorded', paymentId: results.insertId });
            }
        );
    });
};

// Get Payment History for a Loan
exports.getPaymentsByLoanId = async (req, res) => {
    const { loan_id } = req.params;

    db.query('SELECT * FROM payments WHERE loan_id = ?', [loan_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        
        // Check if any payments were found for the loan_id
        if (results.length === 0) {
            return res.status(404).json({ message: 'No payments found for this loan ID' });
        }

        res.status(200).json(results);
    });
};



