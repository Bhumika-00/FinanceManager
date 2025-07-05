const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes'); // ✅ Make sure this exists

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes); // ✅ Add this line

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.error(err));
