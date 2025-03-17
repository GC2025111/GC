import Cart from "../models/Cart.js";
import Product from "../models/Product.js";


import mongoose from "mongoose"; 

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        console.log(req.body);

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid userId or productId" });
        }

        const parsedQuantity = Number(quantity);
        if (!userId || !productId || parsedQuantity <= 0 || isNaN(parsedQuantity)) {
            return res.status(400).json({ success: false, message: "Invalid request" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const findIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());

        if (findIndex === -1) {
            cart.items.push({ productId, quantity: parsedQuantity });  // ✅ Store as a number
        } else {
            cart.items[findIndex].quantity += parsedQuantity;  // ✅ Now addition works correctly
        }

        await cart.save();
        res.status(200).json({ success: true, message: "Product added to cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getCart = async (req, res) => {
    try{
        const {userId} = req.params;
        if(!userId) return res.status(400).json({success:false,message:"Please login to view cart!"});
        const cart=await Cart.findOne({userId});
        if(!cart) return res.status(404).json({success:false,message:"Please add items to cart!"});
        res.status(200).json({success:true,message:"Cart fetched successfully",cart});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}
const updateCart = async (req, res) => {
    try{
        const {userId,productId,quantity}=req.body;
        if(!userId || !productId || quantity<=0 ) return res.status(400).json({success:false,message:"Invalid request"});

        const cart=await Cart.findOne({userId});
        if(!cart) return res.status(404).json({success:false,message:"Cart not found"});
        const findindex=cart.items.findIndex(item=>item.productId.toString()===productId.toString());
        if(findindex===-1) return res.status(404).json({success:false,message:"Product not found in cart"});
        cart.items[findindex].quantity=quantity;
        await cart.save();
        res.status(200).json({success:true,message:"Cart updated successfully",cart});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}
const deleteCart = async (req, res) => {
    try{
        const {userId,productId}=req.params;
        if(!userId || !productId) return res.status(400).json({success:false,message:"Invalid request"});
        const cart=await Cart.findOne({userId});
        if(!cart) return res.status(404).json({success:false,message:"Cart not found"});
        cart.items=cart.items.filter(item=>item.productId.toString()!==productId.toString());
        await cart.save();
        res.status(200).json({success:true,message:"Product deleted from cart",cart});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}
const deleteCartAll = async (req, res) => {
    try{
        const { userId } = req.params; 

        
        if (!userId) {
            return res.status(400).json({ success: false, message: "Invalid userId" });
        }

        
        const result = await Cart.deleteMany({ userId });

        if (result.deletedCount > 0) {
            return res.status(200).json({ success: true, message: "Cart deleted successfully" });
        } else {
            return res.status(404).json({ success: false, message: "No cart found for this user" });
        }
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

export { addToCart, getCart, updateCart, deleteCart, deleteCartAll };


