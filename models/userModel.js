const db = require('../config/db')

const User = {
    create: (userData, callback) => {
        const query = 'INSERT INTO users (name, email, phone_number, date_joined) VALUES (?, ?, ?, ?)';
        db.query(query, [userData.name, userData.email, userData.phone_number, new Date()], callback)
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM users'
        db.query(query, callback)
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE user_id = ?'
        db.query(query, [id], callback)
    },

    update: (id, userData, callback) => {
        const query = 'UPDATE users SET name = ?, email = ?, phone_number = ?, WHERE user_id = ?';
        db.query(query, [userData.name, userData.email, userData.phone_number, id], callback)
    },
     
    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE user_id = ?';
        db.query(query, [id], callback)
    }
}

module.exports = User;