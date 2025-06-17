import React, { useState } from "react";
import "./generate.css";
import AdminNavigation from "./navigation";
import TopBar from "../TopBar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPendingBills } from "../../features/data.Slice";


const GenerateBill = () => {
  const dispatch=useDispatch();
  const [connectionNo, setConnectionNo] = useState("");
  const [rate, setRate] = useState("");
  const [units, setUnits] = useState("");
  const [amount, setAmount] = useState(0);

  // Get current date
  const currentDate = new Date().toISOString().split("T")[0];

  // Calculate due date (10 days from current date)
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 10);
  const formattedDueDate = dueDate.toISOString().split("T")[0];

  // Calculate amount when rate or units change
  function handleChange(e){
    if(e.target.name==='rate'){
        setRate(e.target.value);
        setAmount(parseFloat(e.target.value)* parseFloat(units));
    }
    else{
        setUnits(e.target.value);
        setAmount(parseFloat(e.target.value)* parseFloat(rate));
    }
  }
  function submitForm(e){
    e.preventDefault();
    axios.post('http://localhost:3000/generateBill', {bill:{connectionNo, rate, units, amount, currentDate, formattedDueDate}},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    .then((res)=>{
        if(res.data.status==='valid'){
            setConnectionNo("");
            setAmount("");
            setRate("");
            setUnits("");
            console.log(res.data.updatedBills);
            dispatch(setPendingBills(res.data.updatedBills));
        }

        else{
            alert(res.data.message);
        }
        
    })
  }

  return (
    <div className=" user-page">
        <TopBar/>
      {/* Title of the bills section */}
      <div className="page">
        <AdminNavigation/>
    <div className="generate-bill">
    <div className="bill-container">
      <h2 className="bill-heading">Generate Bill</h2>
      <form onSubmit={submitForm} className="bill-form">
        <div className="form-group">
          <label>Connection No:</label>
          <input
            type="text"
            value={connectionNo}
            onChange={(e) => setConnectionNo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Rate (per unit):</label>
          <input
            type="number"
            name="rate"
            value={rate}
            onChange={(e) => {
              handleChange(e)
            }}
            required
          />
        </div>

        <div className="form-group">
          <label>Units Consumed:</label>
          <input
            type="number"
            name="units"
            value={units}
            onChange={(e) => {
                handleChange(e)
            }}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input type="number" value={amount} readOnly />
        </div>

        <div className="form-group">
          <label>Current Date:</label>
          <input type="date" value={currentDate} readOnly />
        </div>

        <div className="form-group">
          <label>Due Date:</label>
          <input type="date" value={formattedDueDate} readOnly />
        </div>

        <button type="submit" className="submit-btn">Generate</button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default GenerateBill;
