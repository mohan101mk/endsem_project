// app/(main)/insights/page.js
'use client';

import RequireAuth from '../../components/RequireAuth';
import { useFinance } from '../layout'; // Adjust path
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { getCategoryPieData, getTrendsBarData } from '../../utils/chartHelpers'; // Adjust path
import styles from './insights.module.css'; // Optional CSS for layout

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function InsightsPage() {
  const { transactions } = useFinance();
  const pieData = getCategoryPieData(transactions);
  const barData = getTrendsBarData(transactions);

  return (
    <RequireAuth>
      <div className={styles.container}>
        <h1 className={styles.header}>Insights</h1>
        <div className={styles.chartsContainer}>
          <div className={styles.chartWrapper}>
            <h2>Spending by Category</h2>
            <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
          <div className={styles.chartWrapper}>
            <h2>Spending Trends</h2>
            <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>
      </div>
    </RequireAuth>
  );
  
  
  
}
