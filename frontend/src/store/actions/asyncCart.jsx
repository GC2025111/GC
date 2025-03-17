import axios from "axios";
import { addToCart, getCart, updateCart, deleteCart, deleteCartAll } from "../slices/cartSlice";



export const asyncaddToCart = (userId,productId,quantity) => async (dispatch,getState) => {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const token=localStorage.getItem("token");

    console.log("productID="+ productId, "quantity="+ quantity, "userId="+userId);
    try{
        const response=await axios.post(`${backendUrl}/api/cart/addtocart`,{userId,productId,quantity});
        console.log(response);
        dispatch(addToCart(response.data));
    }
catch(error){
    console.error(error);
}
}

export const asyncgetCart = (userId) => async (dispatch,getState) => {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const token=localStorage.getItem("token");
    try{
        const response=await axios.get(`${backendUrl}/api/cart/getcart/${userId}`);
        
        dispatch(getCart(response.data.cart.items));
        localStorage.setItem("cart",(response.data.cart.items));        
    }
    catch(error){
        console.error(error);
    }
}
export const asyncdeleteCart = (userId,productId) => async (dispatch,getState) => {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const token=localStorage.getItem("token");
   
    try{
        const response=await axios.delete(`${backendUrl}/api/cart/deletecart/${userId}/${productId}`);
        dispatch(deleteCart(response.data.cart));
        dispatch(asyncgetCart(userId));       
        localStorage.setItem("cart",response.data.cart);
    }
    catch(error){
        console.error(error);
    }
}
export const asyncdeleteCartAll = (userId) => async (dispatch,getState) => {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const token=localStorage.getItem("token");
    try{
        const response=await axios.delete(`${backendUrl}/api/cart/deletecartall/${userId}`);
        dispatch(deleteCartAll(response.data.cart));
        localStorage.removeItem("cart");
    }
    catch(error){
        console.error(error);
    }
}

export const asyncupdateCart = (userId,productId,quantity) => async (dispatch,getState) => {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const token=localStorage.getItem("token");
    console.log("userId=",userId," productId=",productId," quantity=",quantity);
    try{
        const response=await axios.put(`${backendUrl}/api/cart/updatecart`,{userId,productId,quantity});
        dispatch(updateCart(response.data.cart));
        dispatch(asyncgetCart(userId));        
        localStorage.setItem("cart",response.data.cart);
    }
    catch(error){
        console.error(error);
    }
}