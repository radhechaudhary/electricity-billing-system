import React from "react";
import '../style/Transactions.css'
import TopBar from "../TopBar";
import AdminNavigation from "./navigation";
import { useSelector } from "react-redux";

const AdminTransactions = () => {
  // Sample data for paid bill transactions
  const payedBills= useSelector(state=>state.payedBills)

  return (
    <div className=" user-page">
        <TopBar/>
    <div className="page">
        <AdminNavigation/>
      
    <div className="transactions-container">
      {/* Title of the transactions section */}
      <h2>All Transactions</h2>

      {/* Table to display the transaction details */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Transaction ID</th> {/* Unique transaction ID */}
            <th>Bill Number</th> {/* Unique Bill ID */}
            <th>Paid Date</th> {/* Date of payment */}
            <th>Status</th> {/* Payment status */}
            <th>Amount (₹)</th> {/* Total amount paid */}
            <th>Rate (₹)</th> {/* Rate per unit */}
            <th>Units</th> {/* Number of electricity units consumed */}
          </tr>
        </thead>
        <tbody>
          {/* Mapping through the transactions array to display each record as a row */}
          {Object.keys(payedBills).map((username) => (
                payedBills[username].map((txn)=>(
            <tr key={txn.id}>
              <td>{txn.id}</td> {/* Displaying transaction ID */}
              <td>{txn.billNumber}</td> {/* Displaying bill number */}
              <td>{txn.paidDate}</td> {/* Displaying paid date */}
              <td className="status-paid">{txn.status}</td> {/* Displaying payment status */}
              <td>{txn.amount}</td> {/* Displaying total amount */}
              <td>{txn.rate}</td> {/* Displaying rate per unit */}
              <td>{txn.units}</td> {/* Displaying number of units */}
            </tr>
          ))))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default AdminTransactions; // Exporting the component for use in other files
