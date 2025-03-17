import {createSlice} from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name:"order",
    initialState:{
        approvalURL:null,
        isLoading:false,
        orderId:null,
        orders:[],
    },
    reducers:{  
        setApprovalURL:(state,action)=>{
            state.approvalURL = action.payload;
        },
        setIsLoading:(state,action)=>{
            state.isLoading = action.payload;
        },
        setOrderId:(state,action)=>{
            state.orderId = action.payload;
        },
            getOrders:(state,action)=>{
            state.orders = action.payload;
        }
        
    },  
    
})

export default orderSlice.reducer;
export const {setApprovalURL,setIsLoading,setOrderId,getOrders} = orderSlice.actions;