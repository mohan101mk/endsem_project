import './Dashboard.css'
export default function Dashboard(){
    return (
        <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <div className="dashboard-box">
            <h3 className="box-title">Budget Remaining</h3>
            <hr className="box-divider" />
            <p className="box-content">Shows remaining amount</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Expenses</h3>
            <hr className="box-divider" />
            <p className="box-content">Shows amount spent</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Income</h3>
            <hr className="box-divider" />
            <p className="box-content">Shows income</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Transactions</h3>
            <hr className="box-divider" />
            <p className="box-content">Shows no of transactions</p>
          </div>
        </div>
      </div>
    )
}