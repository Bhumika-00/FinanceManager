import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function BudgetVsActualBarChart({ transactions, budgets }) {
  const actualSpending = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const data = budgets.map(b => ({
    category: b.category,
    budget: b.amount,
    spent: actualSpending[b.category] || 0
  }));

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="budget" fill="#8884d8" />
      <Bar dataKey="spent" fill="#82ca9d" />
    </BarChart>
  );
}
