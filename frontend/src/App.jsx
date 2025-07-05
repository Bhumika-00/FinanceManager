import React, { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from './api';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';

export default function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(res => setTransactions(res.data));
  }, []);

  const handleAdd = tx => setTransactions([tx, ...transactions]);
  const handleDelete = async id => {
    await deleteTransaction(id);
    setTransactions(transactions.filter(tx => tx._id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Personal Finance Tracker</h1>
      <TransactionForm onAdd={handleAdd} />
      <Dashboard transactions={transactions} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
}