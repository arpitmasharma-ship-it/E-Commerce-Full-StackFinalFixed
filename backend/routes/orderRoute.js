import express from "express";
import {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();
///// payment feature
orderRouter.post("/cod", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);
////// user feature
orderRouter.post("/userorders", authUser, userOrders);
///// admin features
orderRouter.post("/status" , adminAuth,  updateStatus);
orderRouter.post("/list",   adminAuth, allOrders);

export default orderRouter;