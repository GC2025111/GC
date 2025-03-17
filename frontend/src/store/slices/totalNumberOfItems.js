import { createSlice } from "@reduxjs/toolkit";

const totalNumberOfItemsSlice=createSlice({
    name:"totalNumberOfItems",
    initialState:{totalNumberOfItems:localStorage.getItem('totalNumberOfItems')||0},
    reducers:{
        setTotalNumberOfItems:(state,action)=>{
            state.totalNumberOfItems=action.payload;
        }
    }
})

export const { setTotalNumberOfItems } = totalNumberOfItemsSlice.actions;
export default totalNumberOfItemsSlice.reducer;
