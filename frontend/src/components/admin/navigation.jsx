import React from 'react'
import { Link } from 'react-router-dom'
import '../style/navigation.css'

function AdminNavigation() {
  return (
    <div className='navigation'>
        <div className='navigation-buttons'>
            <Link to='/admin'>Dashboard<div></div></Link>
            <Link to='/admin/AllBills'>Bills<div></div></Link>
            <Link to='/admin/transactions'>Transactions<div></div></Link>
            <Link to='/admin/generateBills'>Generate<div></div></Link>
        </div>
    </div>
  )
}

export default AdminNavigation
