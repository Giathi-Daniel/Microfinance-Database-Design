// Helper function to make API requests
const fetchData = async (url, method = 'GET', data = null) => {
    const options = { method, headers: { 'Content-Type': 'application/json' } };
    if (data) options.body = JSON.stringify(data);
    
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Error: ${response.status} ${errorDetails.message || ''}`);
    }
    return response.json();
};


// User Management
document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        contact: document.getElementById('userContact').value,
        address: document.getElementById('userAddress').value
    };
    await fetchData('/api/users', 'POST', user);
    loadUsers(); 
});

// Load and display users with edit and delete actions
const loadUsers = async () => {
    const users = await fetchData('/api/users');
    const userTable = document.getElementById('userTable').querySelector('tbody');
    userTable.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.contact}</td>
            <td>${user.address}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userTable.appendChild(row);
    });
};

// Edit User Function
const editUser = async (userId) => {
    // Fetch current user data
    const user = await fetchData(`/api/users/${userId}`);

    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userContact').value = user.contact;
    document.getElementById('userAddress').value = user.address;
    
    // Update button for submitting edits
    const addUserBtn = document.querySelector('#addUserForm button[type="submit"]');
    addUserBtn.textContent = 'Update User';
    addUserBtn.onclick = async (e) => {
        e.preventDefault();
        const updatedUser = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            contact: document.getElementById('userContact').value,
            address: document.getElementById('userAddress').value
        };
        await fetchData(`/api/users/${userId}`, 'PUT', updatedUser);
        loadUsers();
        
        // Reset form and button
        document.getElementById('addUserForm').reset();
        addUserBtn.textContent = 'Add User';
        addUserBtn.onclick = null;
    };
};

// Delete User Function
const deleteUser = async (userId) => {
    console.log("Deleting user with ID:", userId);
    if (confirm("Are you sure you want to delete this user?")) {
        await fetchData(`/api/users/${userId}`, 'DELETE');
        loadUsers();
    }
};

// Loan Management
document.getElementById('applyLoanForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const loan = {
        user_id: document.getElementById('loanUserId').value,
        amount: document.getElementById('loanAmount').value,
        interest_rate: document.getElementById('loanInterestRate').value
    };
    await fetchData('/api/loans', 'POST', loan);
    loadLoans();
});

const loadLoans = async () => {
    const loans = await fetchData('/api/loans');
    const loanTable = document.getElementById('loanTable').querySelector('tbody');
    loanTable.innerHTML = '';
    loans.forEach(loan => {
        loanTable.innerHTML += `<tr><td>${loan.user_id}</td><td>${loan.amount}</td><td>${loan.interest_rate}</td><td>${loan.status}</td></tr>`;
    });
};

// Payment Management
document.getElementById('addPaymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payment = {
        loan_id: document.getElementById('paymentLoanId').value,
        amount_paid: document.getElementById('paymentAmount').value
    };
    await fetchData('/api/payments', 'POST', payment);
    loadPayments();
});

const loadPayments = async () => {
    const payments = await fetchData('/api/payments');
    const paymentTable = document.getElementById('paymentTable').querySelector('tbody');
    paymentTable.innerHTML = '';
    payments.forEach(payment => {
        paymentTable.innerHTML += `<tr><td>${payment.loan_id}</td><td>${payment.amount_paid}</td><td>${payment.date}</td></tr>`;
    });
};

// Load initial data
loadUsers();
loadLoans();
loadPayments();
