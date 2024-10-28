const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/users', userRoutes)
app.use('/api/loans', loanRoutes)
app.use('/api/payments', paymentRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
