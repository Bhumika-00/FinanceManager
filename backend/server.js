const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

// ✅ Railway uses its own PORT
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
