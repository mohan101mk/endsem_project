// app/(main)/budget/page.js
'use client';

import { useState } from 'react';
import { useFinance } from '../layout'; // Adjust path if needed
import RequireAuth from '../../components/RequireAuth';
import styles from './budget.module.css'; // Adjust path to your CSS file

export default function BudgetPage() {
  const { transactions, totalBudget, updateTotalBudget } = useFinance();
  const [editBudget, setEditBudget] = useState(totalBudget);

  // Calculate for current month
  const currentMonth = new Date().toISOString().slice(0, 7); // e.g., '2025-07'
  const monthlyTransactions = transactions.filter(t => t.date.slice(0, 7) === currentMonth);
  const amountSpent = monthlyTransactions.reduce((sum, t) => sum + (t.amount < 0 ? t.amount : 0), 0);
  const amountRemaining = totalBudget + amountSpent; // Spent is negative, so add it

  // Handle budget update
  const handleUpdate = (e) => {
    e.preventDefault();
    updateTotalBudget(parseFloat(editBudget));
  };

  return (
    <RequireAuth>
      <div className={styles.container}>
        <h1 className={styles.title}>Budget</h1>

        {/* Metrics Display */}
        <div className={styles.metrics}>
          <div className={styles.metricItem}>
            <p className={styles.metricLabel}>Total Budget</p>
            <p className={styles.metricValue}>${totalBudget.toFixed(2)}</p>
          </div>
          <div className={styles.metricItem}>
            <p className={styles.metricLabel}>Amount Spent (This Month)</p>
            <p className={styles.metricValue}>${Math.abs(amountSpent).toFixed(2)}</p>
          </div>
          <div className={styles.metricItem}>
            <p className={styles.metricLabel}>Amount Remaining</p>
            <p className={`${styles.metricValue} ${amountRemaining < 0 ? styles.warning : ''}`}>
              ${amountRemaining.toFixed(2)}
            </p>
            {amountRemaining < 0 && <p className={styles.warning}>Over budget!</p>}
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleUpdate} className={styles.editForm}>
          <div className={styles.formGroup}>
            <label htmlFor="budgetInput" className={styles.metricLabel}>Update Total Budget</label>
            <input
              id="budgetInput"
              type="number"
              value={editBudget}
              onChange={(e) => setEditBudget(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>Update</button>
          </div>
        </form>
      </div>
    </RequireAuth>
  );
}
