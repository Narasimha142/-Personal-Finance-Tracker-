import React, { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from '../services/transactionService';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await getTransactions(token);
    setTransactions(res.data);
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id, token);
    fetchTransactions();
  };

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(t => (
          <li key={t._id}>
            {t.type}: {t.amount} - {t.category} 
            <button onClick={() => handleDelete(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
