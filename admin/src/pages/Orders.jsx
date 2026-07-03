import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const token = localStorage.getItem("token")

  const [orders, setOrders] = useState([])

  // ================= FETCH ALL ORDERS =================
  const fetchOrders = async () => {
    try {

      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // ================= UPDATE STATUS =================
  const statusHandler = async (event, orderId) => {
    try {

      const response = await axios.post(
        backendUrl + '/api/order/status',
        {
          orderId,
          status: event.target.value
        },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success("Status Updated")
        fetchOrders()
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])



  console.log("TOKEN:", token);
console.log("BACKEND URL:", backendUrl);

  return (
    <div className='p-4'>

      <h2 className='text-2xl font-semibold mb-4'>All Orders</h2>

      {
        orders.map((order, index) => (

          <div key={index} className='border p-4 mb-4 rounded-lg shadow-sm'>

            {/* ===== ORDER HEADER ===== */}
            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3'>
              
              <p className='text-sm text-gray-600'>
                Order ID: <span className='font-medium'>{order._id}</span>
              </p>

              <p className='text-sm text-gray-600'>
                Date:{" "}
                <span className='font-medium'>
                  {new Date(order.date).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </p>

            </div>

            {/* ===== ADDRESS ===== */}
            <div className='text-sm mb-3'>
              <p className='font-medium'>Customer:</p>
              <p>
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}, {order.address.city}</p>
              <p>{order.address.state}, {order.address.country}</p>
              <p>📞 {order.address.phone}</p>
            </div>

            {/* ===== ITEMS ===== */}
            <div className='border-t pt-3'>
              {
                order.items.map((item, i) => (
                  <div key={i} className='flex justify-between text-sm py-1'>
                    <p>
                      {item.name} ({item.size}) × {item.quantity}
                    </p>
                    <p>{item.price}</p>
                  </div>
                ))
              }
            </div>

            {/* ===== PAYMENT + STATUS ===== */}
            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-3 mt-4'>

              <div className='text-sm'>
                <p>Total: <span className='font-medium'>₹{order.amount}</span></p>
                <p>
                  Payment:{" "}
                  <span className={order.payment ? "text-green-600" : "text-red-500"}>
                    {order.payment ? "Paid" : "Pending"}
                  </span>
                </p>
                <p>Method: {order.paymentMethod}</p>
              </div>

              {/* ===== STATUS DROPDOWN ===== */}
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status || "Order Placed"}
                className='border p-2 rounded'
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>

          </div>
        ))
      }

    </div>
  )
}

export default Orders