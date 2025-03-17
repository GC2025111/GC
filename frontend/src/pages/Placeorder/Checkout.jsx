import React, { useState, useEffect } from 'react';
import "./Checkout.css";
import { asyncgetAddress, asyncaddAddress, asyncdeleteAddress } from '../../store/actions/asyncAddress';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Lenis from "lenis";
import {useLocation } from "react-router-dom";
import { asyncgetproducts } from '../../store/actions/asyncgetproducts';
import { asyncgetCart, asyncdeleteCartAll } from '../../store/actions/asyncCart';
import { asyncCreateOrder, asyncStripePayment } from '../../store/actions/asyncCreateOrder';


function Checkout() {


  const dispatch = useDispatch(); 
  const navigate=useNavigate();
  const address = useSelector(state => state.address);
  const userId = useSelector(state => state.userId.userId);
  const product = useSelector(state => state.product);
  const cart = useSelector(state => state.cart);
  


useEffect(()=>{
  dispatch(asyncgetproducts());
},[dispatch]);


const [formData, setFormData] = useState({
  userId: userId || '',
  address: '',
  landmark: '',
  pincode: '',
  phoneNumber: '',
  deliverySlot: 'Evening' 
});

const [address1, setAddress1] = useState(null);
  const [cartitems,setCarts]=useState([]);
  const [shipping,setShipping]=useState(0);
  const [productsInCart, setProductsInCart] = useState([]);
  const [totalcost,settotalcost]=useState(0);
  const [totalnumberofitems,settotalnumberofitems]=useState(0);


  useEffect(() => {
    const getAddress = async () => {
      const response = await dispatch(asyncgetAddress(userId));
      setAddress1(response);
    };
    getAddress();
  }, [dispatch]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      toast.error("Phone number must be a 10-digit number.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error("Pincode must be a 6-digit number.");
      return;
    }
    console.log(formData);
    const response = await dispatch(asyncaddAddress(formData));
    console.log(response);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error("Something went wrong!");
    }
   const response1= await dispatch(asyncgetAddress(userId));
    setAddress1(response1);
  };
const handleDelete=async(e)=>{
   
    const response=await dispatch(asyncdeleteAddress(userId));
    setAddress1(null);
    if(response.success){
        toast.success(response.message);
    }
    else{
        toast.error(response.message);
    }
}

useEffect(() => {
  if (userId) {
    dispatch(asyncgetCart(userId));
  }
}, [dispatch, userId]);

useEffect(() => {
  if (cart && cart.cart) {
    setCarts(cart.cart);
  }
}, [cart]);


useEffect(()=>{
  if(Array.isArray(cartitems) && Array.isArray(product.products.data)){
    const products = [];
    let noofitems=0;
    cartitems.forEach(item=>{
      product.products.data.forEach(product=>{
        if(product._id===item.productId){
          products.push(product);
          noofitems+=item.quantity;
        }
      });
      setProductsInCart(products);
      if(noofitems>0){
        setShipping(40);
      }
    
    });
    setProductsInCart(products);
    settotalnumberofitems(noofitems);
    let total = products.reduce((acc, product) => acc + product.price * (cartitems.find(item => item.productId === product._id)?.quantity || 0), 0);
    settotalcost(total);
  }
},[cartitems,product.products.data]);







const handlePay=async()=>{
  if(totalnumberofitems===0){
    toast.error("Please add items to cart!");
    navigate("/home");
    return;    
  }
  if(address1.address.length===0){
    toast.error("Please add address!");    
    return;
  }
 

  
  
  const address2={ addressId:address1.address[0]._id,address:address1.address[0].address,landmark:address1.address[0].landmark,pinCode:address1.address[0].pincode,phone:address1.address[0].phoneNumber,deliverySlot:address1.address[0].deliverySlot};

  console.log(address2);



  const orderData={
    userId:userId,
    cartItems:cartitems.map(item=>({
      name:product.products.data.find(product=>product._id===item.productId).name,
        productId:item.productId,
        quantity:item.quantity,       
      imageUrl:product.products.data.find(product=>product._id===item.productId).imageUrl,
      price:product.products.data.find(product=>product._id===item.productId).price,      
    })),
    addressInfo:address2,
    orderStatus:"Order Placed!",
    paymentMethod:"COD",
    paymentStatus:"Pending",
    totalAmount:totalcost+40,
  }
  




  const response=await dispatch(asyncCreateOrder(orderData));
  console.log(response);

  if(response.success){
  await dispatch(asyncdeleteCartAll(userId));    
  settotalnumberofitems(0);
  settotalcost(0);
  localStorage.setItem('cart',JSON.stringify(null));
  setShipping(0); 
    toast.success(response.message);
    navigate(`/placeorder/orders`);
  }
  else{
    toast.error(response.message);
  }
}

useEffect(()=>{
  if(totalnumberofitems===0){
    setShipping(0)
  }
},[totalnumberofitems,shipping])


const handleStripePay=async()=>{
  if(totalnumberofitems===0){
    toast.error("Please add items to cart!");
    navigate("/home");
    return;    
  }
  if(address1.address.length===0){
    toast.error("Please add address!");    
    return;
  }

  const address2={ addressId:address1.address[0]._id,address:address1.address[0].address,landmark:address1.address[0].landmark,pinCode:address1.address[0].pincode,phone:address1.address[0].phoneNumber,deliverySlot:address1.address[0].deliverySlot};
  const orderData={
    userId:userId,
    cartItems:cartitems.map(item=>({
      name:product.products.data.find(product=>product._id===item.productId).name,
        productId:item.productId,
        quantity:item.quantity,       
      imageUrl:product.products.data.find(product=>product._id===item.productId).imageUrl,
      price:product.products.data.find(product=>product._id===item.productId).price,      
    })),
    addressInfo:address2,
    orderStatus:"Pending",
    paymentMethod:"Stripe",
    paymentStatus:"Pending",
    totalAmount:totalcost+40,
  }
  
  const response=await dispatch(asyncStripePayment(orderData));
  
  console.log(response);

}



  return (
    <div>
       <div className='checkouttop'>
      <div id="checkoutleft">
        <div id="checkoutlefttop">
          { address1!== null && address1.address.length>0 ? (
            <>        
            <div id="address">
                <div className='default'>
                    <p>Default Address:<span>&nbsp;IIT STORE:</span></p>
                </div>
              <div className='add'>
                <p className='addressp'>Address:</p><p className='addressp1'> {address1!==null && address1.address[0].address}</p>
              </div>
              <div className='add'>
                <p className='addressp'>Landmark:</p><p className='addressp1'> {address1!==null && address1.address[0].landmark}</p>
              </div>
              <div className='add'>
                <p className='addressp'>Pincode:</p><p className='addressp1'> {address1!==null && address1.address[0].pincode}</p>
              </div>
              <div className='add'>
                <p className='addressp'>Phone:</p><p className='addressp1'> {address1!==null && address1.address[0].phoneNumber}</p>
              </div>
              <div className='add'>
                <p className='addressp'> Slot:</p><p className='addressp1'> {address1!==null && address1.address[0].deliverySlot}</p>
              </div>

              <button className="deleteaddress" onClick={()=>handleDelete()}><i className="ri-delete-bin-6-line"></i>Delete</button>
            </div>
            </>
            
          ) : (
            <>
              <img src="/Images/checkout.webp" alt="No Address Available" />
              <h1>Add New Address</h1>
            </>
          )}
        </div>
        <div id="checkoutleftbottom">
        <form className='addressform' onSubmit={handleSubmit}>
  <div className='address'>
    <label>Address:</label>
    <textarea 
      className='addressinput' 
      name="address" 
      value={formData.address} 
      onChange={handleChange} 
      placeholder='Enter Your Address...'
      required
    />
  </div>

  <div className='landmark'>
    <label>Landmark:</label>
    <input 
      type="text" 
      className='landmarkinput' 
      name="landmark" 
      value={formData.landmark} 
      onChange={handleChange} 
      placeholder='Enter Your Landmark...'
      required
    />
  </div>

  <div className='pincode'>
    <label>Pincode:</label>
    <input 
      type="text" 
      className='pincodeinput' 
      name="pincode" 
      value={formData.pincode} 
      placeholder='Enter 6 digit pincode...'
      onChange={handleChange} 
      required
    />
  </div>

  <div className='phoneNumber'>
    <label>Phone Number:</label>
    <input 
      type="text" 
      className='phoneNumberinput' 
      name="phoneNumber" 
      value={formData.phoneNumber} 
      onChange={handleChange} 
      placeholder='Enter Your 10 digit Phone Number...'
      required
    />
  </div>

 
  <div className='deliverySlot'>
    <label>Delivery Slot:</label>
    <select 
      className='deliverySlotinput' 
      name="deliverySlot" 
      value={formData.deliverySlot} 
      onChange={handleChange} 
      required
    >
      <option value="Noon">Noon</option>
      <option value="Evening">Evening</option>
      <option value="Night">Night</option>
    </select>
  </div>

  <button type="submit" className='addressformbutton'>Add Address</button>
</form>

        </div>
      </div>
      <div id="checkoutright">
        
          <div className="crhead">Cart <span>&nbsp;Total</span></div>
        <div className="crcost">
          <div className="crsubtotal"><div className="txt15">Subtotal({totalnumberofitems} items)</div><div className="txt16">₹{totalcost}</div></div>
          <div className="crshipping"><div className="txt15">Shipping</div><div className="txt16">₹{shipping}</div></div>
          <div className="crtotal"><div className="txt17">Total</div><div className="txt18">₹{`${totalcost+shipping}`}</div></div>
          <div className="paybuttoncontainer">
          <button className="paybutton" onClick={handleStripePay}><img src="https://images.stripeassets.com/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg?q=80&w=1082"/>Pay With Stripe</button>          
          <button className="paybutton1" onClick={handlePay}><i className="ri-money-rupee-circle-line paybutton1icon"></i>Cash On Delivery</button>          
          </div>
        </div>
      </div>
      </div>
      <div id="checkoutbottom">
      
        
        <div className="botcontainer">
            <div className="headcontainer">
        <h3>Review Your Order</h3> 
        <button className="checkoutbutton" onClick={()=>navigate(`/cart/${userId}`)}>Edit Orders</button>
            </div>
        
          {
            
           productsInCart.length>0 && productsInCart.map((product,index)=>(
              <div className="cartitems1" key={index}>
               <div className="cartoroimg"> <img src={product.imageUrl[0]} alt={product.name} /></div>
                <h3 className="cartoroname">{product.name}</h3>   
                <div className="cartorobut">
                    <button className="cartorobut1" onClick={()=>navigate(`/home`)}>Buy More</button>
                    <button className="cartorobut2" onClick={()=>navigate(`/cart/${userId}`)}>Edit Quantity</button>
                </div>             
              </div>
            ))
          }
          
        </div>
      </div>
    </div>
  )
}

export default Checkout
