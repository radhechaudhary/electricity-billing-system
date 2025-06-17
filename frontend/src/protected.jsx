import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPayedBills, setDueBills,  setPendingBills, setUsers, setProfile } from './features/data.Slice'

function Protected() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const loggedIn= useSelector(state=>state.loggedIn) 
  const [isAunthenticated, setIsAuthenticated]=useState(null);
  useEffect(()=>{
    if(loggedIn && localStorage.getItem('username') && localStorage.getItem('token')){
      axios.post("http://localhost:3000/authenticate", {username:localStorage.getItem('username'), role:localStorage.getItem('role')},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then((response)=>{
        if(response.data.status==='success'){
          dispatch(setPayedBills(response.data.payedBills));
          dispatch(setPendingBills(response.data.pendingBills));
          dispatch(setUsers(response.data.users));
          dispatch(setDueBills(response.data.dueBills));
          dispatch(setProfile(response.data.profile));
          setIsAuthenticated(true)
        }
        else navigate('/', {replace:true})
      })
      .catch((err)=>{
        console.log(err.message)
        navigate('/', {replace:true})
      })
    }
  },[loggedIn, navigate, dispatch])

  if(isAunthenticated===null){
      return(
      <div className='enter-page'>
      </div>)
    }
    else{
      return isAunthenticated?<Outlet/>:null
    }
}

export default Protected