// app/(main)/dashboard/page.js
'use client';

import './Dashboard.css';
import RequireAuth from '../../components/RequireAuth';
import { useFinance } from '../layout'; // Adjust path if needed (from our earlier setup)

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const { transactions, totalBudget } = useFinance();

  // Current month for filtering (e.g., '2025-07')
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyTransactions = transactions.filter(t => t.date.slice(0, 7) === currentMonth);

  // Calculations
  const expenses = monthlyTransactions.reduce((sum, t) => sum + (t.amount < 0 ? Math.abs(t.amount) : 0), 0);
  const income = monthlyTransactions.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0);
  const transactionCount = monthlyTransactions.length;
  const remaining = totalBudget - expenses;

  // Recent transactions mini-list (top 5, sorted recent-first)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Prepare data for expense trends line chart
  // Group expenses by date (sum of abs negative amounts)
  const expenseByDate = monthlyTransactions.reduce((acc, t) => {
    if (t.amount < 0) {
      acc[t.date] = (acc[t.date] || 0) + Math.abs(t.amount);
    }
    return acc;
  }, {});

  // Sort dates for chart labels
  const sortedDates = Object.keys(expenseByDate).sort();

  const chartData = {
    labels: sortedDates,
    datasets: [{
      label: 'Daily Expenses',
      // You were missing the 'data:' key here
      data: sortedDates.map(date => expenseByDate[date]),
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.2)',
      fill: true,
      tension: 0.1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Expense Trends (This Month)' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <RequireAuth>
      <div className="dashboard-main-wrapper">
        <h2 className="dashboard-title">Dashboard Overview</h2>
        <div className="dashboard-grid">
          <div className="dashboard-box">
            <h3 className="box-title">Budget Remaining</h3>
            <p className="box-content">${remaining.toFixed(2)}</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Expenses</h3>
            <p className="box-content">${expenses.toFixed(2)} (this month)</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Income</h3>
            <p className="box-content">${income.toFixed(2)} (this month)</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Transactions</h3>
            <p className="box-content">{transactionCount} (this month)</p>
          </div>
        </div>

        <div className="expense-div" style={{height: '400px'}}>
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="recent-transactions">
          <h2 className="recent-title">Recent Transactions</h2>
          <ul className="recent-list">
            {recentTransactions.map(t => (
              <li key={t.id} className="recent-item">
                <p>{t.date} - {t.category}</p>
                <p className={t.amount < 0 ? 'amount-negative' : 'amount-positive'}>${t.amount.toFixed(2)}</p>
              </li>
            ))}
            {recentTransactions.length === 0 && <p>No recent transactions.</p>}
          </ul>
        </div>
      </div>
    </RequireAuth>
  ); 
}
