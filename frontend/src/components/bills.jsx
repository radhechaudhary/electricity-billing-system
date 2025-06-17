import React from "react";
import "./style/Bills.css"; // Importing the external CSS file for styling
import TopBar from "./TopBar"; // Importing the TopBar component
import Navigation from "./navigation";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPendingBills , setPayedBills} from "../features/data.Slice";

const Bills = () => {
  const pendingBills= useSelector(state=>state.pendingBills)
  const dispatch= useDispatch();
  function payBill(index){
    let bill=pendingBills[index];
    alert(`Pay Bill offer for Bill Number: ${bill.billNumber} of ₹${bill.amount}`);
    dispatch(setPendingBills(pendingBills.filter((b)=>b.billNumber!==bill.billNumber)));
    axios.post('http://localhost:3000/payBill',{bill:bill, connectionNo:localStorage.getItem('username')},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response)=>{
      dispatch(setPayedBills(response.data.payedBills));
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }
  return (
    <div className=" user-page">
        <TopBar/>
      {/* Title of the bills section */}
      <div className="page">
        <Navigation/>
      

      {/* Table to display the bill details */}
      <div className='curr-page bills-container'>
      <h2>Pending Electricity Bills</h2>
      <table className="bills-table">
        <thead>
          <tr>
            <th>#</th> {/* Serial Number */}
            <th>Bill Number</th> {/* Unique Bill ID */}
            <th>Units</th> {/* Number of electricity units consumed */}
            <th>Rate (₹)</th> {/* Rate per unit in rupees */}
            <th>Penalty</th>
            <th>Amount (₹)</th> {/* Total amount to be paid */}
            <th>Date</th> {/* Bill generation date */}
            <th>Due Date</th> {/* Last date to pay the bill */}
            <th>Action</th> {/* Pay button column */}
          </tr>
        </thead>
        <tbody>
          {/* Mapping through the bills array to display each bill as a row */}
          {pendingBills.map((bill, index) => (
            <tr key={bill.id}>
              <td>{index + 1}</td> {/* Displaying serial number */}
              <td>{bill.billNumber}</td> {/* Displaying bill number */}
              <td>{bill.units}</td> {/* Displaying number of units */}
              <td>{bill.rate}</td> {/* Displaying rate per unit */}
              <td>{bill.penalty}</td>
              <td>{bill.amount}</td> {/* Displaying total amount */}
              <td>{bill.date}</td> {/* Displaying bill date */}
              <td>{bill.dueDate}</td> {/* Displaying due date */}
              <td>
                {/* Pay button for bill payment */}
                <button onClick={()=>{payBill(index)}} className="pay-btn">Pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>


  );
};

export default Bills; // Exporting the component for use in other files
