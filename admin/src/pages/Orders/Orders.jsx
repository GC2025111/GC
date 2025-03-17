import React,{useEffect,useState} from 'react'
import "./Orders.css"
import axios from "axios"
import {toast} from "react-toastify"

const Orders = ({token}) => {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order for the popup
  const backendUrl = import.meta.env.VITE_BACKEND;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/order/allorders`);
      if (res.data.success) {
        setOrders(res.data.orders);        
      } else {
        toast.error("Error fetching orders! Check your internet connection or contact the developer!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching orders! Check your internet connection or contact the developer!");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const handleUpdateStatus =async(orderId, status) => {
    
    try{
      const res = await axios.put(`${backendUrl}/api/order/update-order-status`,{orderId,status});
      if(res.data.success){
        toast.success("Order status updated successfully!");
        fetchOrders();
      }
    }catch(error){
      console.log(error);
      toast.error("Error updating order status!");
    }
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order to display in the popup
    document.body.style.overflow = "hidden"; // Disable scrolling on the outer page
  };
  
  const handleClosePopup = () => {
    setSelectedOrder(null); // Close the popup by clearing the selected order
    document.body.style.overflow = "auto"; // Re-enable scrolling on the outer page
  };
  



  
  return (
   <>
  
  <div className="orderscontainer">
        <div className="orderheading">
          <h1>All Orders</h1>
        </div>
        <div className="orderlist">
          {orders.map((order,index) => (
            <div className="orderitem" key={index}>
              <div className="orderleft">
                <div className="orderid">Order ID: {order._id}</div>
                <div className="orderdate">
                  <div className="datehead">Date:</div>
                  <div className="datevalue">{order.createdAt.split('T')[0]}</div>
                </div>
                <div className="orderdeatilsbutton">
                  <button onClick={() => handleViewDetails(order)}>View Details</button>
                </div>
              </div>
              <div className="orderright">
                <div className="address">
                  <div className="addresshead">Address: {order.addressInfo.address}</div>
                  <div className="landmark">Landmark: {order.addressInfo.landmark}</div>
                  <div className="pincode">Pincode: {order.addressInfo.pinCode}</div>
                  <div className="phone">Phone: {order.addressInfo.phone}</div>
                </div>
                <div className="orderstatus">
                  <div className="statushead">Status:</div>
                  <div className="statusvalue">
                    
                    <select defaultValue={order.orderStatus} >
                      <option value="Order Placed!">Order Placed!</option>
                      <option value="Order Packed!">Order Packed!</option>
                      <option value="Order Shipped!">Order Shipped!</option>
                      <option value="Order Delivered!">Order Delivered!</option>
                      <option value="Order Cancelled!">Order Cancelled!</option>
                    </select>
                    <button className="updatestatusbutton" onClick={(e) => handleUpdateStatus(order._id, e.target.previousSibling.value)}>Update Status</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedOrder && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
            <h2>Order Details</h2>
          <div className="orderdetails1">
           <div className="paymentmethod">{selectedOrder.paymentMethod}</div>
           <div className="paymentstatus">{selectedOrder.paymentStatus}</div>
           <div className="totalamount">Total Amount:Rs{selectedOrder.totalAmount}</div>
           </div>
           <div className="orderitems">
            {selectedOrder.cartItems.map((item,index)=>(
              <div className="orderitemss" key={index}>
                <div className="orderitemimagess"><img src={item.imageUrl} alt={item.name} /></div>
                <div className="orderitemnamess">{item.name}</div>               
                <div className="orderitemquantityss">Quantity: {item.quantity}</div>
              </div>
            ))}
           
           </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Orders;
