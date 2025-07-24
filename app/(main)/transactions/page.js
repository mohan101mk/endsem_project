
'use client';

import { useState } from 'react';
import { useFinance } from '../layout'; 
import RequireAuth from '../../components/RequireAuth';
import styles from './Transactions.module.css'; 

export default function TransactionsPage() {
  const { transactions, updateTransactions } = useFinance();
  const [newTransaction, setNewTransaction] = useState({ date: '', category: '', amount: '' });
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ date: '', category: '', amount: '' });

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTransaction.date || !newTransaction.category || !newTransaction.amount) return;
    const updated = [...transactions, { id: Date.now().toString(), ...newTransaction, amount: parseFloat(newTransaction.amount) }];
    updateTransactions(updated);
    setNewTransaction({ date: '', category: '', amount: '' });
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditValues({ date: t.date, category: t.category, amount: t.amount });
  };


  const handleEdit = (e) => {
    e.preventDefault();
    const updated = transactions.map(t =>
      t.id === editingId ? { ...t, ...editValues, amount: parseFloat(editValues.amount) } : t
    );
    updateTransactions(updated);
    setEditingId(null);
  };

  return (
    <RequireAuth>
      <div className={styles.container}>
        <h1 className={styles.title}>Transactions</h1>

        
        <form onSubmit={handleAdd} className={styles.addForm}>
          <div className={styles.formGroup}>
            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              className={styles.input}
              required
            />
            <select
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              className={styles.input}
              required
            >
              <option value="">Select Category</option>
              <option value="Income">Income</option>
              <option value="Groceries">Groceries</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transport">Transport</option>
              <option value="Dining">Dining</option>
              <option value="Other">Other</option>
              
            </select>
            <input
              type="number"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              placeholder="Amount (negative for expense)"
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>Add Transaction</button>
          </div>
        </form>

        
        <ul className={styles.transactionList}>
          {sortedTransactions.map(t => (
            <li key={t.id} className={styles.transactionItem}>
              {editingId === t.id ? (
                <form onSubmit={handleEdit} className={styles.formGroup}>
                  <input
                    type="date"
                    value={editValues.date}
                    onChange={(e) => setEditValues({ ...editValues, date: e.target.value })}
                    className={styles.input}
                  />
                  <select
                    value={editValues.category}
                    onChange={(e) => setEditValues({ ...editValues, category: e.target.value })}
                    className={styles.input}
                  >
                    <option value="Income">Income</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                  <input
                    type="number"
                    value={editValues.amount}
                    onChange={(e) => setEditValues({ ...editValues, amount: e.target.value })}
                    className={styles.input}
                  />
                  <button type="submit" className={`${styles.button} ${styles.saveButton}`}>Save</button>
                  <button type="button" onClick={() => setEditingId(null)} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
                </form>
              ) : (
                <>
                  <div>
                    <p><strong>Date:</strong> {t.date}</p>
                    <p><strong>Category:</strong> {t.category}</p>
                    <p className={`${styles.amount} ${t.amount < 0 ? styles.amountNegative : styles.amountPositive}`}>
                      <strong>Amount:</strong> ${t.amount.toFixed(2)} {t.amount < 0 ? '(Expense)' : '(Income)'}
                    </p>
                  </div>
                  <button onClick={() => startEdit(t)} className={`${styles.button} ${styles.editButton}`}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </RequireAuth>
  );
}
