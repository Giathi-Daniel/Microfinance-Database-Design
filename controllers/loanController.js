const db = require('../config/db');
const { validationResult } = require('express-validator');

// Apply for a Loan
exports.applyLoan = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, amount, interest_rate, status } = req.body;
    db.query(
        'INSERT INTO loans (user_id, amount, interest_rate, status) VALUES (?, ?, ?, ?)',
        [user_id, amount, interest_rate, status || 'pending'],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error', details: err });
            res.status(201).json({ message: 'Loan application submitted', loanId: results.insertId });
        }
    );
};

// Get Loan Details by ID
exports.getLoanById = async (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM loans WHERE loan_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });
        if (results.length === 0) return res.status(404).json({ error: 'Loan not found' });
        res.status(200).json(results[0]);
    });
};

// Update Loan Status
exports.updateLoanStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;
    db.query(
        'UPDATE loans SET status = ? WHERE loan_id = ?',
        [status, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error', details: err });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Loan not found' });
            res.status(200).json({ message: 'Loan status updated' });
        }
    );
};
