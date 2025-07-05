const express = require('express');
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/', getTransactions);
router.post('/', addTransaction);
router.delete('/:id', deleteTransaction);
router.put('/:id', editTransaction);

module.exports = router;
