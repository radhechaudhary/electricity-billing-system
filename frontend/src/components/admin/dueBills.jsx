import React from 'react'
import '../style/Bills.css'
import TopBar from '../TopBar';
import AdminNavigation from './navigation';
import { useSelector } from 'react-redux';

function Dues() {
  const dueBills= useSelector(state=>state.dueBills);
  return (
    <div className=" user-page">
        <TopBar/>
      {/* Title of the bills section */}
      <div className="page">
        <AdminNavigation/>
      

      {/* Table to display the bill details */}
      <div className='curr-page bills-container'>
      <h2>Bills crossed Due Date</h2>
      <table className="bills-table">
        <thead>
          <tr>
            <th>Bill No</th>
            <th>Connection No</th>
            <th>Bill Date</th>
            <th>Due Date</th>
            <th>Penalty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through the bills array to display each bill as a row */}
          {dueBills.map((bill, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Displaying serial number */}
              <td>{bill.BillNumber}</td> {/* Displaying bill number */}
              <td>{bill.connectionNo}</td> {/* Displaying number of units */}
              <td>{bill.billDate}</td> {/* Displaying rate per unit */}
              <td>{bill.dueDate}</td> {/* Displaying total amount */}
              <td>{bill.penalty}</td>
              <td>{bill.amount}</td> {/* Displaying bill date */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  )
}

export default Dues
