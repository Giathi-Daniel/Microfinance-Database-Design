const db = require('../config/db')

const Repayment = {
    create: (repaymentData, callback) => {
        const query = 'INSERT INTO RepaymentSchedules (loan_id, repayment_date, amount_due, amount_paid, status) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [repaymentData.loan_id, repaymentData.repayment_date, repaymentData.amount_due,  repaymentData.amount_paid, 'due'], callback)
    },

    getAllByLoan: (loanId, callback) => {
        const query = 'SELECT * FROM RepaymentSchedules WHERE loan_id = ?'
        db.query(query, [loanId], callback)
    },

    updateStatus: (repaymentId, status, callback) => {
        const query = 'UPDATE RepaymentSchedules SET status = ?, WHERE repayment_id = ?';
        db.query(query, [status, repaymentId], callback)
    },
     
}

module.exports = Repayment;