import React,{useEffect} from 'react'
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { asyncdeleteCartAll } from '../../store/actions/asyncCart';

const Verify = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userId=useSelector(state=>state.userId.userId);
    const [searchparams,setSearchParams]=useSearchParams();
    const success=searchparams.get("success");
    const orderId=searchparams.get("orderId");



    const verifyStripeOrder=async()=>{
        const backendUrl=import.meta.env.VITE_BACKEND;
        console.log(backendUrl,userId);

        try{
            const response=await axios.post(`${backendUrl}/api/orders/verify-stripe-order`,{orderId,success,userId});
            if(response.data.success){
                toast.success("Order Paid Successfully!");
                await dispatch(asyncdeleteCartAll(userId));    
                localStorage.setItem('cart',JSON.stringify(null));
                navigate("/placeorder/orders");

            }
            else{
                toast.error("Order Failed!");            
                navigate("/placeorder/checkout");
            }

        }
        catch(error){
            toast.error("Error Verifying Order!");
        }       

    }
    useEffect(()=>{
        verifyStripeOrder();
    },[]);


        
  return (
    <>

    </>
  )
}

export default Verify
