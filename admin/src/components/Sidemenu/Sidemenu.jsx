import React,{useState,useEffect,useRef} from 'react'
import "./Sidemenu.css";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { NavLink } from 'react-router-dom';




function Sidemenu() {
  const [activeMenu, setActiveMenu] = useState(localStorage.getItem('activeMenu')||null);
  
  const smenu1 = useRef(null);
  const i1 = useRef(null);
  const smenu2 = useRef(null);
  const i2 = useRef(null);


  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem('activeMenu',menu);
  };






  return (
    <div id="sidemenu">
     <NavLink to="/orders">
      <div
        id="smenu1" ref={smenu1} 
        className={`menu-item1 ${activeMenu === "smenu1" ? "active" : ""}`}
        onClick={() => handleMenuClick("smenu1")}
      >
        <img ref={i1}src="/Images/order.png" alt="Orders" /><h3>Orders</h3> 
      </div>
      </NavLink>
      <NavLink to="/addproduct">
      <div
        id="smenu2" ref={smenu2} 
        className={`menu-item2 ${activeMenu === "smenu2" ? "active" : ""}`}
        onClick={() => handleMenuClick("smenu2")}
      >
        <img ref={i2}src="/Images/Add.png" alt="Add Product" /><h3>Add Product</h3> 
      </div>
      </NavLink>
      
      
    </div>
  )
}

export default Sidemenu
