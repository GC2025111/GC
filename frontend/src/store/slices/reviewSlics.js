import {createSlice} from "@reduxjs/toolkit";

const reviewSlice=createSlice({
    name:"review",
    initialState:{
        reviews:null
    },
    reducers:{
        addReview:(state,action)=>{
            state.reviews=action.payload;
        },
        getReviews:(state,action)=>{
            state.reviews=action.payload;
        }

    }
})

export const {addReview,getReviews}=reviewSlice.actions;
export default reviewSlice.reducer;

