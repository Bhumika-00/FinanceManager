import React from 'react';
import { deleteTransaction } from '../api';

export default function TransactionList({ transactions, onDelete }) {
  return (
    <ul>
      {transactions.map(tx => (
        <li key={tx._id}>
          ₹{tx.amount} - {tx.description} - {tx.category} - {new Date(tx.date).toLocaleDateString()}
          <button onClick={() => onDelete(tx._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}