import React from 'react'
import './Dashboard.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidemenu from '../../components/Sidemenu/Sidemenu'
import Footer from '../../components/Footer/Footer'
import {Routes,Route} from 'react-router-dom'
import Orders from '../Orders/Orders'
import AddProduct from '../AddProduct/AddProduct'
import Lenis from 'lenis';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Dashboard({setToken,token}) {
  const lenis = new Lenis();  const location = useLocation();
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

  return (
    <>
    <Navbar setToken={setToken} token={token}/>
    <div className='dashboard'>
    <Sidemenu/>    
    <Routes>
        <Route path="/orders" element={<Orders token={token}/>}/>
        <Route path="/addproduct" element={<AddProduct token={token}/>}/>
    </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default Dashboard