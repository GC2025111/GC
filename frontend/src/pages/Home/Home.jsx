import React, {useState,useEffect} from 'react'
import "./Home.css"
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

import ProductCard from '../../components/Products/Product'
import './Home.css'
import Lenis from "lenis";
import {useLocation,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import {asyncgetproducts} from '../../store/actions/asyncgetproducts';
import { asyncaddToCart,asyncgetCart } from '../../store/actions/asyncCart';
import { setTotalNumberOfItems } from '../../store/slices/totalNumberOfItems';

function Home() {
  const navigate=useNavigate();
  const lenis = new Lenis();
  const location = useLocation();
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


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncgetproducts());    
  }, [])
  const products=useSelector((state)=>state.product.products);
  



  const cart=useSelector((state)=>state.cart);
  const userId=useSelector((state)=>state.userId.userId);
  console.log(cart);
  const q=1;

  
  useEffect(()=>{
    dispatch(asyncgetCart(userId));    
  },[userId])




  let [totalnumberofitems,settotalnumberofitems]=useState(0);
  useEffect(() => {
    if (Array.isArray(cart.cart)) {
      let total = cart.cart.reduce((acc, item) => acc + item.quantity, 0);
      settotalnumberofitems(total);
      dispatch(setTotalNumberOfItems(total));
      localStorage.setItem('totalNumberOfItems', total);
    }
  }, [cart]);  

  const handleAddToCart=(userId,productId,quantity)=>{
    dispatch(asyncaddToCart(userId,productId,quantity));
    dispatch(asyncgetCart(userId));
    totalnumberofitems++;
    dispatch(setTotalNumberOfItems(totalnumberofitems));
    localStorage.setItem('totalNumberOfItems', totalnumberofitems);
  }
  const handlebuynow=()=>{

  }
  


  return (
    <div>
        <Navbar totalnumberofitems={totalnumberofitems} userId={userId} />  
        <div className="products">
            {products.data && products.data.map((product,idx)=>(
                <ProductCard key={idx} productId={product._id} name={product.name} price={product.price} quantity={product.quantity} image={product.imageUrl[0]} handleAddToCart={handleAddToCart} userId={userId} handlebuynow={handlebuynow} />
            ))}
        </div>
        
        <Footer/>
    </div>
  )
}

export default Home
