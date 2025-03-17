import axios from "axios";
import { setAddress, getAddress, deleteAddress } from "../slices/addressSlice";

export const asyncaddAddress =(formData)=> async (dispatch, getState) => {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const token=localStorage.getItem("token");    
    try{
    const response = await axios.post(`${backendUrl}/api/address/addAddress`,formData);
    dispatch(setAddress(response.data));
    return response.data;   
    console.log(response.data); 
    localStorage.setItem("address",response.data);
    }
    catch(error){
        console.log(error);
    }
};

export const asyncgetAddress =(userId)=> async (dispatch, getState) => {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const token=localStorage.getItem("token");
    try{
const response = await axios.get(`${backendUrl}/api/address/getAddress/${userId}`);
dispatch(getAddress(response.data));
localStorage.setItem("address",response.data);
return response.data;
console.log(response.data);
    }
    catch(error){
        console.log(error);
    }
};

export const asyncdeleteAddress =(userId) => async (dispatch, getState) => {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const token=localStorage.getItem("token");
    try{
        const response = await axios.delete(`${backendUrl}/api/address/deleteAddress/${userId}`);
        dispatch(deleteAddress(response.data));
        return response.data;
            console.log(response.data);
       
    }
    catch(error){
        console.log(error);
    }
};