import React from 'react'
import { Link } from 'react-router-dom'
import './style/navigation.css'

function Navigation() {
  return (
    <div className='navigation'>
        <div className='navigation-buttons'>
            <Link to='/user'>Dashboard<div></div></Link>
            <Link to='/user/bills'>Bills<div></div></Link>
            <Link to='/user/transactions'>Transaction<div></div></Link>
            <Link to='/user/my-profile'>Profile<div></div></Link>
        </div>
    </div>
  )
}

export default Navigation
