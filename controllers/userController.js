const db = require('../config/db');

// Get all users
exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

// Add a new user
exports.addUser = (req, res) => {
    const { name, email, contact, address } = req.body;
    db.query('INSERT INTO users (name, email, contact, address) VALUES (?, ?, ?, ?)', [name, email, contact, address], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'User created', userId: results.insertId });
    });
};

// Get a single user
exports.getUserById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE user_id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results[0]);
    });
};

// Update user
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, contact, address } = req.body;
    db.query('UPDATE users SET name = ?, email = ?, contact = ?, address = ? WHERE user_id = ?', [name, email, contact, address, id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'User updated' });
    });
};

// Delete user
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE user_id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'User deleted' });
    });
};
