import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    cartItems: [
        {
        name: { type: String },
        productId: { type: String },         
        quantity: { type: Number },       
        imageUrl: { type: [String] },
        price: { type: Number },
        },
    ],
    addressInfo: {
        addressId: { type: String },
        address: { type: String },
        landmark: { type: String },
        pinCode: { type: String },
        phone: { type: String },
        deliverySlot: { type: String },
    },
    orderStatus: {
        type: String,
        default: "Order Placed!",
    },
    paymentMethod: {
        type: String,
        default: "COD",
    },
    paymentStatus: {
        type: String,
        default: "Pending",
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    paymentId: { type: String },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
