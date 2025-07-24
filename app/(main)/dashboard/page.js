
'use client';

import './Dashboard.css';
import RequireAuth from '../../components/RequireAuth';
import { useFinance } from '../layout'; 

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const { transactions, totalBudget } = useFinance();


  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyTransactions = transactions.filter(t => t.date.slice(0, 7) === currentMonth);

  const expenses = monthlyTransactions.reduce((sum, t) => sum + (t.amount < 0 ? Math.abs(t.amount) : 0), 0);
  const income = monthlyTransactions.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0);
  const transactionCount = monthlyTransactions.length;
  const remaining = totalBudget - expenses;
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  const expenseByDate = monthlyTransactions.reduce((acc, t) => {
    if (t.amount < 0) {
      acc[t.date] = (acc[t.date] || 0) + Math.abs(t.amount);
    }
    return acc;
  }, {});
  const sortedDates = Object.keys(expenseByDate).sort();



  const chartData = {
    labels: sortedDates,
    datasets: [{
      label: 'Daily Expenses',
      data: sortedDates.map(date => expenseByDate[date]),
     
      borderColor: 'hsl(214, 90%, 52%)',
      backgroundColor: 'hsla(214, 90%, 52%, 0.1)',
      fill: true,
      tension: 0.4, 
      pointBackgroundColor: 'hsl(214, 90%, 52%)',
      pointBorderColor: '#fff',
      pointHoverRadius: 7,
      pointHoverBackgroundColor: 'hsl(214, 90%, 52%)',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
        text: 'Monthly Expense Trend',
        align: 'start',
        font: {
          size: 18,
          family: 'inherit', 
          weight: '600'
        },
        color: 'hsl(215, 25%, 27%)', 
        padding: {
          bottom: 20,
        }
      },
      tooltip: {
        backgroundColor: 'hsl(215, 25%, 27%)',
        titleFont: { size: 14, family: 'inherit' },
        bodyFont: { size: 12, family: 'inherit' },
        padding: 12,
        cornerRadius: 8,
        boxPadding: 4,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'hsl(210, 30%, 96%)', 
        },
        ticks: {
          color: 'hsl(210, 9%, 55%)' 
        }
      },
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          color: 'hsl(210, 9%, 55%)'
        }
      }
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
            <p className="box-content">${expenses.toFixed(2)}</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Income</h3>
            <p className="box-content">${income.toFixed(2)}</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Transactions</h3>
            <p className="box-content">{transactionCount}</p>
          </div>
        </div>

        <div className="expense-div">
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="recent-transactions">
          <h2 className="recent-title">Recent Transactions</h2>
          <ul className="recent-list">
            {recentTransactions.map(t => (
              <li key={t.id} className="recent-item">
                <div className="item-details">
                  <p className="item-category">{t.category}</p>
                  <p className="item-date">{t.date}</p>
                </div>
                <p className={t.amount < 0 ? 'amount-negative' : 'amount-positive'}>
                  {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
                </p>
              </li>
            ))}
            {recentTransactions.length === 0 && <p className="no-items-message">No recent transactions.</p>}
          </ul>
        </div>
      </div>
    </RequireAuth>
  );
}