import React, { useState} from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = ({setToken,token}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);    
    const backendUrl=import.meta.env.VITE_BACKEND;
    console.log(backendUrl);



    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            console.log(email,password);
          const response=await axios.post(`${backendUrl}/api/users/adminlogin`,{email,password});
          console.log(response);
           
           
            if (response.data.success) {              
                toast.success('Login successful!');
                setToken(response.data.token);
                localStorage.setItem('token',response.data.token);
            } else {
                toast.error(response.data.msg);
                
            }
        } catch (error) {
            console.log(error);
            toast.error('Login failed, please try again!');
        } finally {
            setIsLoading(false); 
        }
          
        
      }
  return (
    <>
    <div id="loginmain">
    <div id="lleft">
     <video src={"/Videos/v1.mp4"} autoPlay loop muted></video>
     
             <div id="lltext">
         Get Everything, You Need!
          <br /> Admin Panel
        </div>
      </div>




      <div id="lright">
        <div id="lotop">
          <h4>Login Your Account.</h4>
          <h1>Admin LogIN!</h1>
          <br />
          <h4>Enter your email and password.</h4>
        </div>

        <div id="lomid">
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form">Email Address</label>
              <input
                type="email"
                id="email"
                className="place1"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'} 
                  id="password"
                  className="place1"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />} 
                </button>
              </div>
            </div>

            <button type="submit" id="login-button" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

       
      </div>
    </div>
    </>
  )
}

export default Login
