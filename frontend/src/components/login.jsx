import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedIn, setProfile } from "../features/data.Slice";

export default function Login() {
  const navigate= useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch= useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login', { username, password })
    .then((response)=>{
      if(response.data.status==='failure'){
        setError(response.data.error);
      }
      else if(response.data.status==='success'){
        setError('');
        if(response.data.type==='admin'){
          localStorage.setItem('username', 'Admin');
          localStorage.setItem('role', 'admin');
          localStorage.setItem('token', response.data.token);
          dispatch(setLoggedIn(true))
          console.log(response.data)
          navigate('/admin');
        }
        else{
          localStorage.setItem('username', username);
          localStorage.setItem('role', 'user');
          localStorage.setItem('token', response.data.token);
          dispatch(setProfile(response.data.profile))
          dispatch(setLoggedIn(true))
          navigate('/user');
        }
      }
      
    })
    .catch((error)=>{
      console.log(error.message)
    })
  };

  return (
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className='form-button' type="submit">Login</button>
        </form>
      </div>
  );
}
