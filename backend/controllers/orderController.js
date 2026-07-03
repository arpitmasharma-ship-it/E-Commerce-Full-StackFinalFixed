import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";
/* Stripe → online payment gateway (international)
Razorpay → Indian payment gateway */

// 🔑 init payment gateways
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET_KEY
// });


// ================= PLACE ORDER (COD) =================
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
      /* paymentMethod: "COD" → cash on delivery
payment: false → abhi payment nahi hua
date → order time */
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();  //// 👉 Database me order save ho gaya

    // clear cart 
    await userModel.findByIdAndUpdate(userId, { cartData: {} }); //// 👉 Order hone ke baad cart empty

    res.json({ success: true, message: "Order Placed (COD)" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ================= STRIPE =================
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = new orderModel({ ///// this is the another way of creating the new order 
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now()
    });

    const order = await orderData.save();

    const line_items = items.map((item) => ({    ///// isse sidha paste karo 
      /* 👉 items = user ke cart ke products
👉 map() = har product ko ek naye format me convert kar raha hai */
      price_data: {  /// /* 👉 Stripe ko batata hai: 👉 "Is product ki price kya hai" */
        currency: "inr", /* 👉 INR = Indian Rupees 👉 Stripe ko currency batani zaroori hoti hai */
        product_data: {
          name: item.name  //// 👉 Product ka naam (jo user ko dikhega payment page pe)
        },
        unit_amount: item.price * 100  ///// 👉 Stripe rupees me nahi, paise me kaam karta hai
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({/* :👉 Stripe ko bol rahe: 👉 "Ek payment page bana de user ke liye" */
      success_url: `http://localhost:5173/verify?success=true&orderId=${order._id}`, //// /* 👉 Agar payment SUCCESS ho gaya: User redirect hoga: */
      cancel_url: `http://localhost:5173/verify?success=false&orderId=${order._id}`,
      line_items,
      mode: "payment"
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ================= RAZORPAY =================
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now()
    });

    const order = await orderData.save();

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: order._id.toString()
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order: razorpayOrder
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ================= ADMIN ALL ORDERS =================
const allOrders = async (req, res) => {
  /* req = request (frontend kya bhej raha hai)
res = response (backend kya bhejega) */
  try {
    const orders = await orderModel.find({});
    /* 📌 {} = empty filter 👉 Koi condition nahi → sab kuch fetch karo */

    res.json({ success: true, orders });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ================= USER ORDERS =================
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;  //// jo particular order apko chaiye uski id le raha ho app 

    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ================= UPDATE STATUS =================
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status Updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus
};