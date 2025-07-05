import React, { useEffect, useState } from 'react';
import MonthlyBarChart from '../charts/MonthlyBarChart';
import CategoryPieChart from '../charts/CategoryPieChart';
import BudgetVsActualBarChart from '../charts/BudgetVsActualBarChart';
import BudgetForm from './BudgetForm';
import SpendingInsights from './SpendingInsights';
import { getBudgets } from '../api';

export default function Dashboard({ transactions }) {
  const total = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
  const latest = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    getBudgets().then(res => setBudgets(res.data));
  }, []);

  const handleSetBudget = (updated) => {
    setBudgets(prev => {
      const found = prev.find(b => b.category === updated.category);
      return found
        ? prev.map(b => b.category === updated.category ? updated : b)
        : [...prev, updated];
    });
  };

  return (
  <div className="container">
    <div className="card">
      <h2>Dashboard Summary</h2>
      <p><strong>Total Expenses:</strong> ₹{total}</p>
    </div>

    <div className="card">
      <CategoryPieChart transactions={transactions} />
    </div>

    <div className="card">
      <MonthlyBarChart transactions={transactions} />
    </div>

    <div className="card">
      <BudgetForm onSet={handleSetBudget} />
    </div>

    <div className="card">
      <BudgetVsActualBarChart transactions={transactions} budgets={budgets} />
    </div>

    <div className="card">
      <SpendingInsights transactions={transactions} budgets={budgets} />
    </div>

    <div className="card">
      <h3>Recent Transactions</h3>
      <ul>
        {latest.map(tx => (
          <li key={tx._id}>{tx.description} - ₹{tx.amount}</li>
        ))}
      </ul>
    </div>
  </div>
);

}
