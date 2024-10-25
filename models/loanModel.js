const db = require('../config/db')

const Loan = {
    create: (loanData, callback) => {
        const query = 'INSERT INTO loans (user_id, loan_amount, date_loaned, status) VALUES (?, ?, ?, ?)';
        db.query(query, [loanData.user_id, loanData.loan_amount,new Date(), 'pending'], callback)
    },

    getAllByUser: (userId, callback) => {
        const query = 'SELECT * FROM loans WHERE user_id = ?'
        db.query(query, [userId], callback)
    },

    updateStatus: (loanId, status, callback) => {
        const query = 'UPDATE loans SET status = ?, WHERE loan_id = ?';
        db.query(query, [status, loanId], callback)
    },
     
    delete: (loanId, callback) => {
        const query = 'DELETE FROM loans WHERE loan_id = ?';
        db.query(query, [loanId], callback)
    }
}

module.exports = Loan;