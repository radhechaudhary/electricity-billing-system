import { useEffect} from 'react'
import Home from './components/home'
import { Route, Routes } from 'react-router-dom'
import Protected from './protected';
import UserPage from './components/userPage';
import Bills from './components/bills';
import Transactions from './components/transactions';
import AdminDashBoard from './components/admin/adminDashboard';
import AdminBills from './components/admin/billings';
import AdminTransactions from './components/admin/transactions';
import AllUsers from './components/admin/costumers';
import GenerateBill from './components/admin/generateBills';
import { useNavigate } from 'react-router-dom';
import Dues from './components/admin/dueBills';
import ProfileInfo from './components/profile';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from './features/data.Slice';

function App() {
  const navigate=useNavigate();
  const dispatch= useDispatch();

  useEffect(()=>{
    if(localStorage.getItem('username') && localStorage.getItem('token')){
      dispatch(setLoggedIn(true));
      if(localStorage.getItem('role')==='admin'){
        navigate('/admin')
      }
      else{
        navigate('user')
      }
    }
  },[])

  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route element={<Protected/>}>
        <Route path='/user' element={<UserPage/>}/>
        <Route path='/user/bills' element={<Bills/>}/>
        <Route path='/user/my-profile' element={<ProfileInfo/>}/>
        <Route path='/user/transactions' element={<Transactions/>}/>
        <Route path='/admin' element={<AdminDashBoard/>}/>
        <Route path='/admin/AllBills' element={<AdminBills/>}/>
        <Route path='/admin/transactions' element={<AdminTransactions />}/>
        <Route path='/admin/AllCostumers' element={<AllUsers/>}/>
        <Route path='/admin/generateBills' element={<GenerateBill />}/>
        <Route path='/admin/DueBills' element={<Dues/>}/>
      </Route>
    </Routes>
  )
}

export default App
