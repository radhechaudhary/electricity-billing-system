import React from 'react'
import TopBar from '../TopBar'
import AdminNavigation from './navigation';
import {useNavigate} from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CampaignIcon from '@mui/icons-material/Campaign';
import AllUsers from './costumers';

function AdminDashBoard() {
  
  const navigate=useNavigate();
  return (
    <div className='user-page'>
    <TopBar/>
    <div className='page'>
      <AdminNavigation/>
      <div className='curr-page dashboard'>
        <h1 style={{fontSize:"45px"}}>Dashboard</h1>
        <h2 style={{fontSize:"30px", fontWeight:"100"}}>Stats (Overview)</h2>
        <div className='dashboard-cards'>
        <div className='card' onClick={()=>{navigate('/admin/AllCostumers')}}>
            <CurrencyRupeeIcon sx={{ fontSize: 50}}/>
            <div className='name-and-count'>
              <p>All Users</p>
            </div>
          </div>
          <div className='card' onClick={()=>{navigate('/admin/DueBills')}}>
            <CurrencyRupeeIcon sx={{ fontSize: 50}}/>
            <div className='name-and-count'>
              <p>Due bills</p>
            </div>
          </div>
          <div className='card' onClick={()=>{navigate('/admin/AllBills')}}>
            <CurrencyRupeeIcon sx={{ fontSize: 50}}/>
            <div className='name-and-count' >
              <p>Generated Bills</p>
            </div>
          </div>
          <div className='card' onClick={()=>{navigate('/admin/transactions')}}>
            <CampaignIcon sx={{ fontSize: 50}}/>
            <div className='name-and-count'>
              <p>Total Transactions</p>
            </div>
          </div>
          <div className='card' onClick={()=>{navigate('/admin/generateBills')}}>
            <CurrencyRupeeIcon sx={{ fontSize: 50}}/>
            <div className='name-and-count' >
              <p>New Bill</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default AdminDashBoard
