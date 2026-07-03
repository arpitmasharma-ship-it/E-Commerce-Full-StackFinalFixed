import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from "axios";  //// 👉 backend API call karne ke liye


const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  /* token   👉 user login proof (authentication) */
  /* 🔹 backendUrl 👉 API ka base URL */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {   ///// 👉 jab user type karega
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({
      ...data,  ////// 👉 iska matlab   👉 purana data copy karo
      [name]: value //// 👉 dynamic key create kar raha hai
    }))
  }
  /* User input me type karta hai
        ↓
event.target.name = "city"
event.target.value = "Delhi"
        ↓
setFormData run hota hai
        ↓
old data copy hota hai (...data)
        ↓
city update hoti hai
        ↓
new state ban jata hai
        ↓
React re-render karta hai */

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find(product => product._id === items)
            )
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }


      // console.log(orderItems)

      // 📦 Final Order Data
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      // 🔥 SWITCH CASE (MAIN LOGIC)
      switch (method) {

        // ================= COD =================
        case "cod":

          /* 👉 axios = library jo HTTP request bhejti hai backend ko */
          /* 👉 .post() = POST request bhejna (data ke saath) */
          /* 👉 “Server ko bol rahe ho → ye data lo aur order create karo” */
          /* await 👉 ruk jao jab tak server se response na aa jaye */
          /* 🧠 Without await: 👉 code turant aage badh jata (response milne se pehle) */
          const response = await axios.post(
            backendUrl + "/api/order/cod",
            orderData,
            { headers: { token } }
          );
          /* 👉 response → axios se aaya backend ka result
          👉 response.data → actual data jo backend ne bheja
          👉 success → backend ka flag (true/false) */
          if (response.data.success) {   /* 👉 check kar rahe ho: 👉 order successfully place hua ya nahi */
            setCartItems({});  /////// 👉 cart ko empty kar diya /// it it very important 
            toast.success("Order Placed Successfully 🎉");
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        // ================= STRIPE =================
        case "stripe":
          const stripeRes = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );

          if (stripeRes.data.success) {
            /* 👉 window = browser ka global object  👉 isme sab hota hai: URL,tabs,history,location*/
            window.location.replace(stripeRes.data.session_url); // 🔥 redirect
            /* 👉 browser ko bolta hai:  👉 "Is page ko hata ke new page load kar do" */
          } else {
            toast.error(stripeRes.data.message);
          }
          break;

        // ================= RAZORPAY =================
        case "razorpay":
          const razorRes = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );

          if (razorRes.data.success) {
            console.log(razorRes.data.order); // आगे integrate करेंगे
            toast.success("Razorpay Order Created");
          } else {
            toast.error(razorRes.data.message);
          }
          break;

        // ================= DEFAULT =================
        default:
          toast.error("Invalid Payment Method");
          break;
      }


    } catch (error) {
      console.log("ERROR:", error);
      toast.error(error.message);
    }
  }

  console.log("setCartItems:", setCartItems);

  /* User "Place Order" click karta hai
        ↓
axios.post request jata hai
        ↓
Backend order process karta hai
        ↓
Response aata hai (success true/false)
        ↓
if check hota hai

CASE 1: success = true
   ↓
   cart empty
   ↓
   success toast
   ↓
   orders page pe redirect

CASE 2: success = false
   ↓
   error toast show */

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14  min-h-[80vh] border-t'>
      {/* Left SSection  */}
      <div className='flex flex-col gap-4 w-full  sm:max-w-[480px] '   >

        <div className='text-xl sm:text-2xl my-3 '>
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        <div className='flex gap-3  ' >
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
        </div>

        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Enter Your Email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />

        <div className='flex gap-3  ' >
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
        </div>

        <div className='flex gap-3  ' >
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="text" placeholder='Pin-Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
        </div>

        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="Number" placeholder='Enter Your Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />


      </div>

      {/* Right Section  */}
      <div className='mt-8'  >

        <div className='mt-8 min-w-80 '   >
          <CartTotal />
        </div>

        <div className='mt-12'   >
          <Title text1={'Payment'} text2={'Method'} />
          {/* Payment Method Selection OKey  */}

          <div className='flex gap-3 flex-col lg:flex-row'   >
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5  border rounded-full  ${method === 'stripe' ? 'bg-green-400' : ''}    `}  ></p>
              <img className='h-5 mx-4 ' src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5  border rounded-full  ${method === 'razorpay' ? 'bg-green-400' : ''}   `}  ></p>
              <img className='h-5 mx-4 ' src={assets.razorpay_logo} alt="" />
            </div>

            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5  border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}   `}  ></p>
              <p className='text-gray-500 text-sm font-medium mx-4 '>Cash On Delivery</p>
            </div>

          </div>

          <div className='w-full text-end mt-8 '  >
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm cursor-pointer hover:bg-gray-500 '>Place Order</button>

          </div>


        </div>

      </div>
    </form>
  )
}

export default PlaceOrder
