import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
        <img src={logo} width="40px"/>
        <div className='nav-buttons'>
            <Link to=''>Home<div></div></Link>
            <Link to=''>Consumer SignUp<div></div></Link>
            <Link tp=''>Admin SignUp<div></div></Link>
        </div>
        <Link className="contact-button-navbar" to=''>Contact us</Link>
    </div>
  )
}

export default Navbar
