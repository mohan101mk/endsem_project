
'use client';

import RequireAuth from '../../components/RequireAuth';
import { useFinance } from '../layout'; 
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { getCategoryPieData, getTrendsBarData } from '../../utils/chartHelpers'; 
import styles from './insights.module.css'; 


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function InsightsPage() {
  const { transactions } = useFinance();
  
  
  const pieData = getCategoryPieData(transactions);
  const barData = getTrendsBarData(transactions);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyExpenses = transactions.filter(t => t.date.slice(0, 7) === currentMonth && t.amount < 0);
  const categories = monthlyExpenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});
  const totalSpent = Object.values(categories).reduce((sum, val) => sum + val, 0);
  const personalizedTips = [];
  for (const [cat, amt] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
    const percentSpent = (amt / totalSpent) * 100;
    if (percentSpent > 20) {
      personalizedTips.push(`High spending on ${cat} (${percentSpent.toFixed(1)}%). Consider budgeting 20% less next month.`);
    }
  }
  const prevMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().slice(0, 7);
  const prevExpenses = transactions.filter(t => t.date.slice(0, 7) === prevMonth && t.amount < 0);
  const prevCatTotals = prevExpenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});
  const trendComparisons = [];
  const allCategories = new Set([...Object.keys(categories), ...Object.keys(prevCatTotals)]);
  for (const cat of allCategories) {
    const currentAmt = categories[cat] || 0;
    const prevAmt = prevCatTotals[cat] || 0;
    if (prevAmt === 0 && currentAmt === 0) continue;
    const pctChange = prevAmt === 0 ? 100 : ((currentAmt - prevAmt) / prevAmt) * 100;
    if (Math.abs(pctChange) < 1) continue;
    trendComparisons.push(`${cat} spending is ${pctChange > 0 ? 'up' : 'down'} by ${Math.abs(pctChange).toFixed(0)}% from last month.`);
  }

  const chartFontOptions = {
    font: { family: 'Inter, sans-serif' },
    color: 'hsl(210, 9%, 55%)', 
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: chartFontOptions,
      },
      tooltip: {
        backgroundColor: 'hsl(215, 25%, 27%)', 
        titleFont: { size: 14, family: 'inherit' },
        bodyFont: { size: 12, family: 'inherit' },
        padding: 12,
        cornerRadius: 8,
      }
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'hsl(215, 25%, 27%)',
        titleFont: { size: 14, family: 'inherit' },
        bodyFont: { size: 12, family: 'inherit' },
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'hsl(210, 30%, 96%)' },
        ticks: chartFontOptions,
      },
      x: {
        grid: { display: false },
        ticks: chartFontOptions,
      },
    },
  };
  

  return (
    <RequireAuth>
      <div className={styles.container}>
        <h1 className={styles.title}>Financial Insights</h1>

        <div className={styles.graphsContainer}>
          <div className={styles.chartWrapper}>
            <h2 className={styles.chartTitle}>Spending by Category</h2>
            <div className={styles.chartCanvasWrapper}>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
          <div className={styles.chartWrapper}>
            <h2 className={styles.chartTitle}>Monthly Spending Trends</h2>
            <div className={styles.chartCanvasWrapper}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>💡 Personalized Tips</h2>
          {personalizedTips.length > 0 ? (
            <ul className={styles.list}>{personalizedTips.map((tip, index) => <li key={index}>{tip}</li>)}</ul>
          ) : (
            <p className={styles.placeholderText}>Perform more transactions this month to receive personalized tips.</p>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>📈 Trend Comparisons</h2>
          {trendComparisons.length > 0 ? (
            <ul className={styles.list}>{trendComparisons.map((trend, index) => <li key={index}>{trend}</li>)}</ul>
          ) : (
            <p className={styles.placeholderText}>No monthly trends available yet. Transactions from last month are needed for comparison.</p>
          )}
        </div>
      </div>
    </RequireAuth>
  );
}