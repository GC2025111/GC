import React, {useEffect,useState} from 'react'
import "./Order.css";
import { useDispatch, useSelector } from 'react-redux';
import { asyncgetOrders } from '../../store/actions/asyncCreateOrder';
import {asyncAddReview} from '../../store/actions/asyncReview';         
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Order = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId.userId);
    
  
  const [ratings, setRatings] = useState({});
  const [texts, setTexts] = useState({});
const [orders,setOrders] = useState([]);
  useEffect(() => {
    dispatch(asyncgetOrders(userId)).then((response) => {      
      setOrders(response.payload || []);
    });
  }, [dispatch, userId]);

  console.log(orders.length);

  if (!orders || orders.length === 0) {
    return (
      <div className="ordersmain">
        <div className="headfornoorders">Order History</div>
        <div className="noorders">No orders found</div>
      </div>
    );
  }







  
  return (
    <>
     <div className="ordersmain">
      <div className="head">Order History</div>
      <div className="order-container">
      {orders.map((order, index) => {
        console.log(order);     
        return (
            <div className="eachorder1" key={index}>
              <div className="eotop">
                <div className="etleft">
                  <div className="etdate">
                    <div className="etdhead">Order Placed</div>
                    <div className="etdtime">{order.createdAt.slice(0, 10)}</div>
                  </div>
                  <div className="ettotal">
                    <div className="ed">Total</div>
                    <div className="etdtime">
                      Rs.{order.paymentMethod === "COD" ? order.totalAmount : (order.totalAmount * 85).toFixed(0)}
                    </div>
                  </div>
                  <div className="epayment">
                    <div className="etdtime">{order.paymentMethod}</div>
                  </div>
                  <div className="etstatus">
                    <div className="etdtime">{order.orderStatus}</div>
                  </div>
                </div>
                <div className="etright">
                  <div className="orderid">Order ID: {order._id}</div>
                  <div className="viewbill">View Bill</div>
                </div>
              </div>
              <div className="eobottom">
                {order.cartItems.map((item, idx) => (
                  <div className="eobottomitem" key={idx}>
                    <div className="eobottomitemleft">
                      <div className="eobottomitemimg">
                        <img src={item.imageUrl[0]} alt={item.name} />
                      </div>
                      <div className="eobottomitemname">{item.name}</div>
                      <div className="eobottomitemquantity">
                        <div className="q1">Quantity</div> <div className="q2">{item.quantity}</div>
                      </div>
                      <div className="eobottomitemprice">
                        <div className="q1">Price</div> <div className="q2">₹{item.price}</div>
                      </div>
                      <div className="eobottomitemtotal">
                        <div className="q1">Total</div> <div className="q2">₹{item.price * item.quantity}</div>
                      </div>
                    </div>
                    <div className="eobottomitemright">
                      <div className="buyagain">
                        <button className="buyagainbtn" onClick={() => navigate("/home")}>
                          <i className="ri-shopping-bag-4-line"></i>&nbsp;Buy More
                        </button>
                      </div>
                      <div className="eobottomitemrating">
                        <div className="eobottomitemratinghead">Ratings</div>
                        <div className="eobottomitemratingstars">
                        
                        </div>
                        <div className="eobottomitemratingreview">
                          <form className="eobottomitemratingreviewform">
                          <textarea
  className="eobottomitemratingreviewtextarea"
  placeholder="Write a review..."
  value={texts[`${order._id}-${item.productId}`] || ""} // Ensure state is properly managed
  onChange={(e) =>
    setTexts((prev) => ({
      ...prev,
      [`${order._id}-${item.productId}`]: e.target.value, // Use unique key
    })) // Use productId
  }
/>
                            <button
                              type="button"
                              className="eobottomitemratingreviewbtn"
                              onClick={() => handleSubmitReview(userId, order._id, item.productId)}>
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        );
      })}
      </div>
    </div>

    </>
  )
}

export default Order
