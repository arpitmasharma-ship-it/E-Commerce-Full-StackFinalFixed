import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';


const Orders = () => {

  const { products, backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([])

  const loadOrderData = async () => {  /////// 👉 Ye function backend se orders fetch karega
    try {
      if (!token) { //////// /* Agar user login nahi hai → API call mat karo 👉 Token = authentication key */
        return null
      }

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {}, //// Empty (kyunki sirf token se identify ho raha user)
        { headers: { token } } /* 👉 Server ko batata hai: 👉 "ye request kis user ki hai" */
      )
      console.log(response.data)
      if (response.data.success) {   ///// 👉 Agar API successful hai tab hi aage badho
        let allOrdersItem = [] //// 👉 Empty array banaya
        response.data.orders.map((order) => {  /// 👉 Har order pe loop
          order.items.map((item) => {   /* Har order ke andar jo items hain unpe loop chalao */
            ///////// order ki info → item ke andar inject kar rahe ho
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item) //// 👉 Har processed item ko array me daal diya
          })
        })
        // console.log(allOrdersItem)
        setorderData(allOrdersItem.reverse()) ///// 👉 Array ko ulta kar deta hai
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'My'} text2={'Orders'} />
      </div>

      <div>
        {
          orderData.map((item, index) => (   // ✅ FIXED

            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>   {/* ✅ FIXED */}

              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />

                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>

                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className='mt-2'>
                    Date: <span className='text-gray-400'>    {new Date(item.date).toLocaleString()}</span>
                  </p>

                  <p className='mt-2'>
                    Payment: <span className='text-gray-400'>{item.paymentMethod}</span>
                  </p>
                
                </div>
              </div>

              <div className='md:w-1/2  flex justify-between '>
                <div className='flex items-center  gap-2 '>
                  <p className='min-w-2 h-2  rounded-full bg-green-500'></p>
                  <p className='text-sm  md:text-base '>{item.status}</p>

                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm  cursor-pointer  '>Track Order </button>

              </div>

            </div>

          ))
        }
      </div>

    </div>
  )
}

export default Orders 