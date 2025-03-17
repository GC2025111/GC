import axios from "axios";
import { addReview, getReviews } from "../slices/reviewSlics";

export const asyncAddReview=(userId, productId, ratings, text)=>async(reviewData)=>{
    const backendUrl=import.meta.env.VITE_BACKEND;
    try{
        const response=await axios.post(`${backendUrl}/api/reviews/addreview`,{
            userId,
            productId,
            ratings,
            text
        });
        dispatch(addReview(response.data.review));

    }
    catch(error){
        console.error("Error adding review:",error);        
    }
}
export const asyncGetReviews=async(productId)=>{
    const backendUrl=import.meta.env.VITE_BACKEND;
    try{
        const response=await axios.get(`${backendUrl}/api/reviews/getreview/${productId}`);
        dispatch(getReviews(response.data.reviews));
        return response.data.reviews;   
    }
    catch(error){
        console.error("Error fetching reviews:",error);
    }
}
