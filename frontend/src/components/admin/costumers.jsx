import React from 'react'
import '../style/Bills.css'
import TopBar from '../TopBar';
import AdminNavigation from './navigation';
import { useSelector } from 'react-redux';

function AllUsers() {
  const users= useSelector(state=>state.users)
  return (
    <div className=" user-page">
        <TopBar/>
      {/* Title of the bills section */}
      <div className="page">
        <AdminNavigation/>
      

      {/* Table to display the bill details */}
      <div className='curr-page bills-container'>
      <h2>All consumers</h2>
      <table className="bills-table">
        <thead>
          <tr>
            <th>#</th> {/* Serial Number */}
            <th>Connection No</th> {/* Unique Bill ID */}
            <th>Name</th> {/* Total amount to be paid */}
            <th>Mobile No.</th> {/* Number of electricity units consumed */}
            <th>Mail</th> {/* Rate per unit in rupees */}
            <th>Aadhar</th> {/* Bill generation date */}
          </tr>
        </thead>
        <tbody>
          {/* Mapping through the bills array to display each bill as a row */}
          {Object.keys(users).map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Displaying serial number */}
              <td>{users[user].username}</td> {/* Displaying bill number */}
              <td>{users[user].name}</td> {/* Displaying number of units */}
              <td>{users[user].mobile}</td> {/* Displaying rate per unit */}
              <td>{users[user].mail}</td> {/* Displaying total amount */}
              <td>{users[user].aadhar}</td> {/* Displaying bill date */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  )
}

export default AllUsers
