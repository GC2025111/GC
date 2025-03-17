import express from "express";
import { addToCart, getCart, updateCart, deleteCart, deleteCartAll } from "../controllers/cartcontroller.js";

const cartRouter = express.Router();

cartRouter.post("/addtocart",addToCart);
cartRouter.get("/getcart/:userId",getCart);
cartRouter.put('/updatecart',updateCart);
cartRouter.delete('/deletecart/:userId/:productId',deleteCart);
cartRouter.delete('/deletecartall/:userId',deleteCartAll);





export default cartRouter;

