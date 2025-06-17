import React from 'react'
import { useNavigate } from 'react-router-dom';
import './style/topBar.css'

function TopBar() {
    const navigate=useNavigate();
    function signOut(){
      localStorage.removeItem('username')
      localStorage.removeItem('role');
      navigate('/')
      alert("signing out")
    }
  return (
    <div className='topBar'>
        <h2>E-Billing System</h2>
        <div className='username-and-signout'>
            <p>{localStorage.getItem('username') || "user"}</p>
            <button onClick={signOut}>SignOut</button>
        </div>
    </div>
  )
}

export default TopBar
