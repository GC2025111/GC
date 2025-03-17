import React,{ useState,useEffect } from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import Placeorder from "./pages/Placeorder/Placeorder"
import Verify from './pages/Placeorder/Verify';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const token = useSelector((state) => state.token);  
  return (
    <>
    <ToastContainer />
    <div id="main">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        {token ? <Route path='/home' element={<Home/>}/> : <Route path='/home' element={<Login/>}/>}
        {token ? <Route path='/cart/:userId' element={<Cart/>}/> : <Route path='/cart' element={<Login/>}/>}
        {token ? <Route path='/placeorder/*' element={<Placeorder/>}/> : <Route path='/placeorder' element={<Login/>}/>}
        <Route path="/verify" element={<Verify/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
