import React from 'react'
import TopBar from './TopBar'
import Navigation from './navigation'
import {useNavigate} from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useSelector } from 'react-redux';

function UserPage() {
  const payedBills= useSelector(state=>state.payedBills)
  const pendingBills= useSelector(state=>state.pendingBills)
  
  const navigate=useNavigate();
  return (
    <div className='user-page'>
    <TopBar/>
    <div className='page'>
      <Navigation/>
      <div className='curr-page dashboard'>
        <h1 style={{fontSize:"45px"}}>Dashboard</h1>
        <h2 style={{fontSize:"30px", fontWeight:"100"}}>Stats (Overview)</h2>
        <div className='dashboard-cards'>
          <div className='card' onClick={()=>{navigate('/user/transactions')}}>
            <CurrencyRupeeIcon sx={{ fontSize: 50}}/>
            <div className='name-and-count'>
              <p>Payed Bills</p>
              <p>{payedBills.length}</p>
            </div>
          </div>
          <div className='card' onClick={()=>{navigate('/user/bills')}}>
            <CurrencyRupeeIcon sx={{ fontSize: 50}}/>
            <div className='name-and-count' >
              <p>Pending Bills</p>
              <p>{pendingBills.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default UserPage
