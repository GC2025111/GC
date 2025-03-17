import {createSlice} from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name: "address",
    initialState: {
        address: []||localStorage.getItem("address")
    },
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        getAddress: (state, action) => {
            state.address = action.payload;
        },
        deleteAddress: (state, action) => {
            state.address = action.payload;
        }
    },
    
    }
)

export default addressSlice.reducer;
export const { setAddress, getAddress, deleteAddress } = addressSlice.actions;