import React, { useState } from 'react';
import './Login.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import axios from 'axios';
import { setToken } from '../../store/slices/tokenSlice';
import { setUserId } from '../../store/slices/userIdSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const backendUrl = import.meta.env.VITE_BACKEND;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(email,password);
    try {      
      if(!email || !password){
        toast.error('Please enter email and password');
        return;
      }      
      const response=await axios.post(`${backendUrl}/api/users/login`,{email,password});
      console.log(response.data);     
      if(response.data.success){
        dispatch(setToken(response.data.token));
        dispatch(setUserId(response.data.userId));
        localStorage.setItem('userId',response.data.userId);
        toast.success('Login successful');  
        
        navigate('/home');
      }
      else{
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div id="loginmain">
        <div id="loginleft">
       
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide><img src="./Images/Register/3.avif" alt="Slide 1" /></SwiperSlide>
        <SwiperSlide><img src="./Images/Register/1.avif" alt="Slide 2" /></SwiperSlide>
        <SwiperSlide><img src="./Images/Register/2.avif" alt="Slide 3" /></SwiperSlide>      
      </Swiper>
        <div id="reltext">
         <h1>Get <br/>Everything,<br/>You Want</h1>
        </div>
      </div>
      <div id="loginright">
        <div id="lotop">
          <h4>Login Your Account.</h4>
          <h1>Welcome Back!</h1>
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
        <div id="lobottom">
        <Link to="/register" style={{ color: 'whitesmoke' }}>
            Don't Have an Account?
          </Link>
        </div>
        </div>
        </div>
        
      </div>
    
  )
}

export default Login
