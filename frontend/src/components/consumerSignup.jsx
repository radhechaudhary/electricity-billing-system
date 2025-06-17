import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedIn, setProfile } from "../features/data.Slice";

export default function ConsumerSignup() {
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    connectionNo: "",
    aadharNo: "",
    mail: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [page, setPage]= useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(page<2){
      setPage(page+1);
      return;
    }
    else if (Object.values(formData).some(field => field === "")) {
      setError("All fields are required");
    } else {
      axios.post('http://localhost:3000/ConsumerSignUp', formData)
      .then((response=>{
        if(response.data.status==='failure'){
          setError(response.data.error);
          return;
        }
        else if(response.data.status==='success'){
          setError('');
          localStorage.setItem('username', formData.connectionNo);
          localStorage.setItem('role', 'user');
          localStorage.setItem('token', response.data.token);
          dispatch(setLoggedIn(true));
          dispatch(setProfile(response.data.profile))
          navigate('/user');
        }
      }))
      .catch((error)=>{
        console.log(error.message);
      })
    }
  };

  return (
    <div className="signup-container">
      <div className="overlay"></div>
      <div className="signup-box">
        <h2>Consumer Signup</h2>
        <form onSubmit={handleSubmit}>
          {page==1?<div className="input-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>:null}
          {page==1?<div className="input-group">
            <label>Mobile No</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
          </div>:null}
          {page==1?<div className="input-group">
            <label>Connection Number</label>
            <input type="text" name="connectionNo" value={formData.connectionNo} onChange={handleChange} required />
          </div>:null}
          {page==2?<div className="input-group">
            <label>Aadhar Number</label>
            <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} required />
          </div>:null}
          {page==2?<div className="input-group">
            <label>Email</label>
            <input type="email" name="mail" value={formData.mail} onChange={handleChange} required />
          </div>:null}
          {page==2?<div className="input-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>:null}
          {error && <p className="error-message">{error}</p>}
          {page==2?<button className='form-button'  type="submit">Signup</button>:<button className='form-button'  type="submit">Next</button>}
        </form>
      </div>
    </div>
  );
}
