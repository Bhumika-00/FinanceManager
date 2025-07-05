const Budget = require('../models/Budget');

const getBudgets = async (req, res) => {
  const budgets = await Budget.find();
  res.json(budgets);
};

const setBudget = async (req, res) => {
  const { category, amount } = req.body;
  const updated = await Budget.findOneAndUpdate(
    { category },
    { amount },
    { upsert: true, new: true }
  );
  res.json(updated);
};

module.exports = { getBudgets, setBudget };
