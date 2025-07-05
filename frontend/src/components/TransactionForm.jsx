import React, { useState } from 'react';
import { addTransaction } from '../api';

const categories = ["Food", "Bills", "Transport", "Entertainment", "Health", "Others"];

export default function TransactionForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) return;
    const res = await addTransaction({ amount, date, description, category });
    onAdd(res.data);
    setAmount(''); setDate(''); setDescription(''); setCategory(categories[0]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

