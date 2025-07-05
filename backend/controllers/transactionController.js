const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
};

const addTransaction = async (req, res) => {
  const { amount, date, description, category } = req.body;
  try {
    const newTransaction = await Transaction.create({ amount, date, description, category });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.findByIdAndDelete(id);
  res.status(204).end();
};

const editTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, date, description, category } = req.body;
  const updated = await Transaction.findByIdAndUpdate(id, { amount, date, description, category }, { new: true });
  res.json(updated);
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
};
