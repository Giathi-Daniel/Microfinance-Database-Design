const db = require('../config/db');
const { validationResult } = require('express-validator');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM users'); // Use await here
        res.status(200).json(results);
    } catch (err) {
        return res.status(500).send(err);
    }
};

// Add a new user
exports.addUser = async (req, res) => {
    const { name, email, contact, address } = req.body;
    try {
        const [results] = await db.query('INSERT INTO users (name, email, contact, address) VALUES (?, ?, ?, ?)', 
        [name, email, contact, address]); // Use await here
        res.status(201).json({ message: 'User created', userId: results.insertId });
    } catch (err) {
        return res.status(500).send(err);
    }
};

// Get a single user
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]); // Use await here
        res.status(200).json(results[0]);
    } catch (err) {
        return res.status(500).send(err);
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, contact, address } = req.body;
    try {
        await db.query('UPDATE users SET name = ?, email = ?, contact = ?, address = ? WHERE user_id = ?', 
        [name, email, contact, address, id]); // Use await here
        res.status(200).json({ message: 'User updated' });
    } catch (err) {
        return res.status(500).send(err);
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM users WHERE user_id = ?', [id]); // Use await here
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        return res.status(500).send(err);
    }
};

// Add a Payment
exports.addPayment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { loan_id, amount_paid } = req.body;
    try {
        const [results] = await db.query(
            'INSERT INTO payments (loan_id, amount_paid) VALUES (?, ?)',
            [loan_id, amount_paid]
        ); // Use await here
        res.status(201).json({ message: 'Payment recorded', paymentId: results.insertId });
    } catch (err) {
        return res.status(500).json({ error: 'Database error', details: err });
    }
};

// Get Payment History for a Loan
exports.getPaymentsByLoanId = async (req, res) => {
    const { loan_id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM payments WHERE loan_id = ?', [loan_id]); // Use await here
        res.status(200).json(results);
    } catch (err) {
        return res.status(500).json({ error: 'Database error', details: err });
    }
};
