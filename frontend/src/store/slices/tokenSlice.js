import { createSlice } from "@reduxjs/toolkit";
const storedToken = localStorage.getItem("token")||"";

const tokenSlice = createSlice({
    name: "token",
    initialState: storedToken,
    reducers: {
        setToken: (state, action) => {
            localStorage.setItem("token", action.payload);
            return action.payload;
        },
        removeToken: (state, action) => {
            localStorage.removeItem("token");
            return "";
        },
    },
});

export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;