import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function MonthlyBarChart({ transactions }) {
  const data = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    const found = acc.find(d => d.month === month);
    if (found) found.total += Number(tx.amount);
    else acc.push({ month, total: Number(tx.amount) });
    return acc;
  }, []);

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="total" fill="#82ca9d" />
    </BarChart>
  );
}
