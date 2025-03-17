import axios from "axios";
import {setApprovalURL,setIsLoading,setOrderId,getOrders} from "../slices/orderSlice";


export const asyncCreateOrder = (orderData)=>async (dispatch,getState) => {
    const backendUrl = import.meta.env.VITE_BACKEND;
    console.log(orderData);  
    try{
      const response =await axios.post(`${backendUrl}/api/orders/create-order`,orderData);
      console.log(response.data);    
      dispatch(setOrderId(response.data.orderId));
      dispatch(setIsLoading(false));
      dispatch(setApprovalURL(response.data.approvalURL));
      return response.data;
    }
    catch(error){
        console.log(error);
        dispatch(setIsLoading(false));
    }
}



export const asyncgetOrders = (userId) => async (dispatch, getState) => {
    const backendUrl = import.meta.env.VITE_BACKEND;    
    try {
        const response = await axios.get(`${backendUrl}/api/orders/userorders/${userId}`);      
       const orders = dispatch(getOrders(response.data.orders)); 
       return orders;
    } catch (error) {
        console.log("Orders Fetch Error:", error);
    }
};


export const asyncStripePayment=(orderData)=> async(dispatch,getState)=>{
    const backendUrl=import.meta.env.VITE_BACKEND;    
    try{
       const response=await axios.post(`${backendUrl}/api/orders/create-order-stripe`,orderData);
       console.log("Stripe Payment Response",response.data);
       if(response.data.success){
        const {session_url}=response.data;
        console.log("session_url",session_url);
        window.location.replace(session_url);
       }
       else{
        toast.error(response.data.message);
       }
    }
    catch(error){
        console.log("Stripe Payment Error",error);
        dispatch(setIsLoading(false));
    }
}
