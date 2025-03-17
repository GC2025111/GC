import React,{useEffect,useRef} from 'react'
import "./Navbar.css"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { NavLink,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';



function Navbar({setToken,token}) {



    const nrl=useRef(null);
    const nund1=useRef(null);
    useGSAP(()=>{
        
        nrl.current.addEventListener("mousemove",()=>{
          gsap.to(nund1.current,{
            width:"100%",
            duration:1,
            ease:"expo.out"
          })
        });
        nrl.current.addEventListener("mouseleave",()=>{
          gsap.to(nund1.current,{
            width:"0%",
            duration:1,
            ease:"expo.out"
          })
        });
       
        });
    




    const navigate = useNavigate();
    const handleLogout = async () => {
        try {         
            setToken("");
            localStorage.removeItem("token");
            localStorage.removeItem("activeMenu");          
            toast.success("Logged Out!");      
            navigate("/");
          
        } catch(error) {
          console.log(error);
          toast.error("Server Error!");
        }
      }

  return (
    <>
    <div id="navbar">
    <div id="navleft">
                    <img src="/Images/1.png" alt="logo" />
                </div>
        <div id="navright">
            <div id="nr-t">
            <a href="https://www.facebook.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-facebook-circle-fill"></i></a>
        <a href="https://www.instagram.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-instagram-fill"></i></a>
        <a href="https://www.twitter.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-twitter-x-line"></i></a>
        <a href="https://www.youtube.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-youtube-fill"></i></a>
            </div>
            <div id="nr-b">
            <NavLink to="/login" onClick={handleLogout} style={{ textDecoration: "none",color:"whitesmoke"}}>
       <div id="navr-l" ref={nrl}><i className="ri-account-circle-fill"></i>&nbsp;Log Out 
        <div className="nunder1" ref={nund1}></div>
        </div>
        </NavLink> 
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar