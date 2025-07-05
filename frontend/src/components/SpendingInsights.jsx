import React from 'react';

export default function SpendingInsights({ transactions, budgets }) {
  const insights = budgets.map(budget => {
    const spent = transactions
      .filter(tx => tx.category === budget.category)
      .reduce((sum, tx) => sum + Number(tx.amount), 0);

    const percentUsed = ((spent / budget.amount) * 100).toFixed(1);
    const status = spent > budget.amount ? 'Over Budget' : 'Within Budget';

    return {
      category: budget.category,
      spent,
      budgeted: budget.amount,
      percentUsed,
      status
    };
  });

  return (
  <div>
    <h3>Spending Insights</h3>
    <ul>
      {insights.map(insight => (
        <li
          key={insight.category}
          style={{
            color: insight.status === 'Over Budget' ? '#d32f2f' : '#388e3c'
          }}
        >
          <strong>{insight.category}</strong>: ₹{insight.spent} / ₹{insight.budgeted} — {insight.percentUsed}% used ({insight.status})
        </li>
      ))}
    </ul>
  </div>
);

}