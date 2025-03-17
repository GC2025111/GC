import Order from "../models/Order.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



const createOrder = async (req, res) => {
    try {
        const { userId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount } = req.body;
        console.log(req.body);
        const orderData={
            userId,
            cartItems,
            addressInfo,
            orderStatus:"Order Placed!",
            paymentMethod:"COD",
            paymentStatus:"Pending",
            totalAmount
        }
        const order= new Order(orderData);
        await order.save();
        res.status(200).json({ success: true,message:"Order Placed Successfully!", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating order!" });
    }
}

const createOrderStripe = async (req, res) => {
    try {
        const { userId, cartItems, addressInfo, totalAmount } = req.body;
        const { origin } = req.headers;

        // ✅ Convert `imageUrl` from array to a single string
        const processedCartItems = cartItems.map(item => ({
            ...item,
            imageUrl: Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl
        }));

        // ✅ Order Data
        const orderData = {
            userId,
            cartItems: processedCartItems,
            addressInfo,
            orderStatus: "Order Placed!",
            paymentMethod: "Stripe",
            paymentStatus: "Pending",
            totalAmount: parseFloat((totalAmount / 85).toFixed(2)),
        };

        // ✅ Save the order in the database
        const newOrder = new Order(orderData);
        await newOrder.save();
        console.log("New Order Created:", newOrder);

        // ✅ Prepare line items for Stripe
        const line_items = processedCartItems.map((item) => {
            const itemPrice = Number(item.price);

            if (isNaN(itemPrice) || itemPrice <= 0) {
                console.error(`Invalid price for item: ${item.name}, Price: ${item.price}`);
                return null;
            }

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.imageUrl] // ✅ Stripe expects an array but with a single image
                    },
                    unit_amount: Math.round(itemPrice * 1.17),// ✅ Stripe requires price in cents
                },
                quantity: item.quantity,
            };
        }).filter(item => item !== null); // ✅ Remove `null` values

        // ✅ Add delivery charges
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: Math.round(.4705),
            },
            quantity: 1,
        });

        console.log("Stripe Line Items:", line_items);

        // ✅ Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        });

        // ✅ Respond with the session URL
        res.status(200).json({ success: true, message: "Order Placed Successfully!", session_url: session.url });
    } catch (error) {
        console.error("Error creating Stripe order:", error);
        res.status(500).json({ success: false, message: "Error creating order!" });
    }
};


const verifyStripeOrder=async(req,res)=>{
    const {orderId,success,userId}=req.body;
    console.log(orderId,success,userId);
    try{
        if(success==="true"){
            await Order.findByIdAndUpdate(orderId,{paymentStatus:"Paid"});  
            console.log("Order Paid Successfully!");     
            res.status(200).json({success:true,message:"Order Paid Successfully!"});
        }else{
            await Order.findByIdAndDelete(orderId);
            console.log("Order Failed!");
            res.status(200).json({success:false,message:"Order Failed!"});
        }

    }catch(error){
        console.error(error);
        console.log("Error Verifying Order!");
        res.status(500).json({success:false,message:"Error Verifying Order!"});
    }
}

const userOrders=async(req,res)=>{
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this user!" });
        }
        
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching orders!" });
    }
}

const allOrders=async(req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching orders!" });
    }
}
const updateOrderStatus=async(req,res)=>{
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { orderStatus: status });
        res.status(200).json({ success: true, message: "Order status updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating order status!" });
    }
}

export {createOrder,createOrderStripe,verifyStripeOrder,userOrders,allOrders,updateOrderStatus};
