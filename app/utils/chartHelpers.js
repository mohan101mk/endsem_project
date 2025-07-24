// app/utils/chartHelpers.js
export function getCategoryPieData(transactions) {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyExpenses = transactions.filter(t => t.date.slice(0, 7) === currentMonth && t.amount < 0);
  
    const categories = monthlyExpenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});
  
    return {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: ['#1976d2', '#1565c0', '#FFCE56', '#4BC0C0', '#9966FF'], // Custom colors matching your theme
      }]
    };
  }
  
  export function getTrendsBarData(transactions) {
    const categories = [...new Set(transactions.map(t => t.category))];
    const monthlyTotals = categories.map(cat => 
      transactions.filter(t => t.category === cat && t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)
    );
  
    return {
      labels: categories,
      datasets: [{
        label: 'Spending by Category',
        data: monthlyTotals,
        backgroundColor: '#1976d2',
      }]
    };
  }
  