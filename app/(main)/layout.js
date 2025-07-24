// app/(main)/layout.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Navbar from '../components/navbar'; // Adjust path if needed
import Footer from '../components/footer';
import RequireAuth from '../components/RequireAuth'; // Import if using auth; adjust path
import styles from './layout.module.css';

// Create context
const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    // Load defaults every time (on mount/refresh)
    const defaultTransactions = [
      { id: '1', date: '2025-07-01', category: 'Income', amount: 2000 }, // Salary income
      { id: '2', date: '2025-07-03', category: 'Groceries', amount: -120 },
      { id: '3', date: '2025-07-05', category: 'Utilities', amount: -80 },
      { id: '4', date: '2025-07-08', category: 'Dining', amount: -45 },
      { id: '5', date: '2025-07-10', category: 'Transport', amount: -30 },
      { id: '6', date: '2025-07-12', category: 'Income', amount: 500 }, // Freelance payment
      { id: '7', date: '2025-07-15', category: 'Entertainment', amount: -60 },
      { id: '8', date: '2025-07-18', category: 'Groceries', amount: -90 },
      { id: '9', date: '2025-07-20', category: 'Utilities', amount: -100 },
      { id: '10', date: '2025-07-22', category: 'Dining', amount: -70 },
    ];
    const defaultBudget = 2500; // Default monthly budget
  
    setTransactions(defaultTransactions);
    setTotalBudget(defaultBudget);
  }, []); // Runs on every mount
  

  // Functions to update in-memory only (no saving)
  const updateTransactions = (newTransactions) => {
    setTransactions(newTransactions);
    // No save here—changes will reset on refresh
  };

  const updateTotalBudget = (newBudget) => {
    setTotalBudget(newBudget);
    // No save here
  };

  return (
    <FinanceContext.Provider value={{ transactions, updateTransactions, totalBudget, updateTotalBudget }}>
      {children}
    </FinanceContext.Provider>
  );
}

// Custom hook for easy access in other components/pages
export function useFinance() {
  return useContext(FinanceContext);
}

// Main layout function
export default function MainLayout({ children }) {
  return (
    <RequireAuth> {/* Omit if not using auth yet */}
      <FinanceProvider>
        <div className={styles.container}>
          <Navbar />
          <main className={styles.main}>
            {children}
          </main>
          <Footer />
        </div>
      </FinanceProvider>
    </RequireAuth>
  );
}
