import './Dashboard.css'
import RequireAuth from '../../components/RequireAuth';
export default function DashboardPage() {
  return (
    <RequireAuth>
      <div className="dashboard-main-wrapper">
        <h2 className="dashboard-title">Dashboard Overview</h2>
        <div className="dashboard-grid">
          <div className="dashboard-box">
            <h3 className="box-title">Budget Remaining</h3>
            <p className="box-content">Shows remaining amount</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Expenses</h3>
            <p className="box-content">Shows amount spent</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Income</h3>
            <p className="box-content">Shows income</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Transactions</h3>
            <p className="box-content">Shows number of transactions</p>
          </div>
        </div>

        <div className='expense-div'>  
          <h2 className='expense-title'>Expense Trends</h2>
          <p>Visualize spending patterns over time here.</p>
        </div>
      </div>
    </RequireAuth>
  );
}