import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import userIdReducer from "./slices/userIdSlice";
import totalNumberOfItemsReducer from "./slices/totalNumberOfItems";
const store = configureStore({
    reducer: {
       token: tokenReducer,
       product: productReducer,
       cart: cartReducer,
       userId: userIdReducer,
       totalNumberOfItems: totalNumberOfItemsReducer,
    },
});

export default store;
