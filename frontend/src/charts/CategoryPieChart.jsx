import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#aa66cc', '#ff4444'];

export default function CategoryPieChart({ transactions }) {
  const data = Object.entries(
    transactions.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
        {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
