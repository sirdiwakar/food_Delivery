import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//placing user order from FE
export const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: `order_rcptid_${newOrder._id}`
        };
        const razorpayOrder = await razorInstance.orders.create(options);
        res.json({
            success: true,
            order_id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID,
            order_db_id: newOrder._id
        });

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "PAYMENT FAILED, if money is deducted it will be returned" });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_db_id } = req.body;

        const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            await orderModel.findByIdAndUpdate(order_db_id, { status: "working on your order", payment: true, paymentId: razorpay_payment_id });
            return res.json({ success: true, message: "Payment verified successfully." });  // Only send one response
        } else {
            await orderModel.findByIdAndDelete(order_db_id);
            return res.json({ success: false, message: "Invalid payment signature." });  // Only send one response
        }
    } catch (err) {
        return res.json({ success: false, message: "Payment verification failed." });  // Only send one response
    }
};


// user orders for frontend

export const userOrders = async(req, res) => {
    try{
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({
            success: true,
            data: orders
        });
    }catch(err){
        console.log(err);
        res.json({success: false, message: "Error"});
    }
}

// Listing orders for adming panel
export const listOrders = async(req, res) => {
    try{    
        const orders = await orderModel.find({});
        res.json({success: true, data: orders});
    }catch(err){
        console.log(err);
        res.json({success: false, message: "Error"});
    }

}


// api for updating order status
export const updateStatus = async (req, res) => {
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Status Updated"});
    }catch(err){
        console.log(err);
        res.json({success: false, message: "Error"});
    }
}