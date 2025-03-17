import React, { useEffect, useState } from 'react';
import "./Placeorder.css";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Checkout from './Checkout';
import Order from './Order';
import { Routes, Route, NavLink,Navigate } from 'react-router-dom';
import Lenis from "lenis";
import {useLocation } from "react-router-dom";
import { useSelector ,useDispatch} from 'react-redux';
import { asyncgetCart } from '../../store/actions/asyncCart';
import { setTotalNumberOfItems } from '../../store/slices/totalNumberOfItems';






function Placeorder() {
    const lenis = new Lenis();
  const location = useLocation();
  const dispatch=useDispatch();
  const userId=useSelector(state=>state.userId.userId);
  useEffect(() => {
    function raf(time) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [lenis]);
  useEffect(() => {
    lenis.stop();
    window.scrollTo(0, 0);
    lenis.start();
  }, [location]);



  useEffect(()=>{
    dispatch(asyncgetCart(userId));
  },[userId])

  let [totalnumberofitems,settotalnumberofitems]=useState(0);
  const cart = useSelector(state => state.cart.cart);
  

   useEffect(() => {
    if (Array.isArray(cart)) {
      let total = cart.reduce((acc, item) => acc + item.quantity, 0);
      settotalnumberofitems(total);
      dispatch(setTotalNumberOfItems(total));
      localStorage.setItem('totalNumberOfItems', total);
    }
  }, [cart]);


  return (
    <div>
       <Navbar totalnumberofitems={totalnumberofitems} />

<div id="placeorderbuttons">
  <NavLink to="/placeorder/orders">
    <button className='buttonp'>Orders</button>
  </NavLink>
  <NavLink to="/placeorder/checkout">
    <button className='buttonp'>Checkout</button>
  </NavLink>
</div>

<div id="placeordercontent">
  <Routes>
    <Route path="/orders" element={<Order/>} />
    <Route path="/checkout" element={<Checkout />} />
    
  </Routes>
</div>

<Footer />
    </div>
  )
}

export default Placeorder

