import React, {useState, useEffect} from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import "./Navbar.css"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector,useDispatch } from 'react-redux';
import { setToken } from '../../store/slices/tokenSlice';

function Navbar({totalnumberofitems,userId}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state)=>state.token);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement your search logic here
        console.log('Searching for:', searchQuery);
    };
    const handleLogout=async()=>{
        try{
            dispatch(setToken(""));
            navigate("/login");
            toast.success("Logged Out Successfully!");
        }
        catch(error) {
            console.log(error);
            toast.error("Server Error!");
          }
    }
   
    return (
        <div>
            <div id="navmain">
                <div id="navleft">
                    <img src="/Images/navbar/1.png" alt="logo" />
                </div>
                <div id="navright">
                    <div id="nrl" className={isScrolled ? 'expanded' : ''}>
                        <form onSubmit={handleSearch} className="search-container">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="search-button">
                                <i className="ri-search-line"></i>
                            </button>
                        </form>
                    </div>
                    <div id="nrr">
                        <div id="nrrtop">
                            <div id="nrr1">
                            <a href="https://www.facebook.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-facebook-circle-fill"></i></a>
        <a href="https://www.instagram.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-instagram-fill"></i></a>
        <a href="https://www.twitter.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-twitter-x-line"></i></a>
        <a href="https://www.youtube.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-youtube-fill"></i></a>
                            </div>
                        </div>
                        <div id="nrrbottom">
                        <NavLink to="/login" onClick={handleLogout} style={{ textDecoration: "none",color:"whitesmoke"}}>
       <div id="navr-l" ><i className="ri-account-circle-fill"></i>&nbsp;Log Out 
       
        </div>
        </NavLink> 
        <NavLink to={`/placeorder/orders`}style={{ textDecoration: "none",color:"whitesmoke"}}>
        <div id="navr-r" ><div id="nrrtext"><i className="ri-shopping-cart-2-fill"></i>&nbsp;Orders
        </div>
        
        </div>
        </NavLink>
        <NavLink to={`/cart/${userId}`}style={{ textDecoration: "none",color:"whitesmoke"}}>
        <div id="navr-r" >
            <div id="nrrtext"><i className="ri-shopping-bag-4-fill"></i>&nbsp;Cart&nbsp;
        <div id="cartcircle" style={{ background: "whitesmoke",color:"black",borderRadius:"6px",padding:"1.2px"}}>{totalnumberofitems}</div></div>
        
        </div>
        </NavLink>
        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar
