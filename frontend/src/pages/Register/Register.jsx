import React, { useState } from 'react';
import './Register.css';
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

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
      const [showPassword, setShowPassword] = useState(false);
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const backendUrl = import.meta.env.VITE_BACKEND;
      console.log(backendUrl);

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();        
        try {
          console.log(formData,backendUrl);
          const response=await axios.post(`${backendUrl}/api/users/register`,formData);
          console.log(response.data.userId);
          dispatch(setToken(response.data.token));
          dispatch(setUserId(response.data.userId));
          localStorage.setItem('userId',response.data.userId);



          if(response.data.success){
            toast.success('Registration successful');  
            localStorage.setItem('token',response.data.token);
            dispatch(setToken(response.data.token));
            navigate('/home');
          }
          else{
            toast.error('Registration failed. Please try again.');
          }
               
        } catch (error) {
          console.error('Registration failed:', error);
          toast.error('Registration failed. Please try again.');
        }
      };



  return (
    <div id="registermain">
      <div id="releft">
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
      <div id="reright">
      <div id="retop">
          <h4>Create Your Account.</h4>
          <h1>Welcome To IIT Store!</h1>
          <br />
          <h4>Enter your name, email, and password.</h4>
        </div>
        <div id="remid">
          <form id="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form">Name</label>
              <input
                className="place1"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form">Email Address</label>
              <input
                className="place1"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group password-field">
              <label htmlFor="password" className="form">Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="place1"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button type="submit" className="submit-button">Register</button>
          </form>
        </div>
        <div id="rebot">
          <Link to="/login" style={{ color: 'whitesmoke' }}>Already Have Account?</Link>
        </div>
      </div>    
       
    </div>
  );
}

export default Register;
