import React, { useState } from 'react';


export default function BudgetForm({ onSet }) {
  const [category, setCategoryVal] = useState("Food");
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await setBudget({ category, amount });
    onSet(res.data);
    setAmount('');
  };

  return (
    <div>
      <h3>Set Monthly Budget</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Category
          <select value={category} onChange={e => setCategoryVal(e.target.value)}>
            <option>Food</option>
            <option>Bills</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Others</option>
          </select>
        </label>
        <label>
          Amount
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
