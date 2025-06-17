import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/bulb.png'
import Login from './login'
import ConsumerSignup from './consumerSignup'

function Home() {
  const [page, setPage]= useState('home');
  return (
    <div className='home-dark'>
    <div className='home'>
        <div className='navbar'>
            <img src={logo} width="40px"/>
            <div className='nav-buttons'>
                <Link to='' onClick={()=>{setPage('home')}}>Home<div></div></Link>
                <Link to='' onClick={()=>{setPage('consumer')}}>Consumer SignUp<div></div></Link>
                <Link className="contact-button-navbar" to=''>Contact us</Link>
            </div>
            
        </div>
        <section className='home-main'>
            {page==='home'?<Login />:null}
            {page==='consumer'?<ConsumerSignup/>:null}
        </section>
    </div>
    </div>
  )
}

export default Home
