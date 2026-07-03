import userModel from "../models/userModel.js";


// ================= ADD TO CART =================
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body

    const userData = await userModel.findById(userId)  /// 👉 DB se user ka data la rahe ho
    let cartData = userData.cartData


    if (cartData[itemId]) {  ///// 👉 "Kya ye product already cart me hai?"
      if (cartData[itemId][size]) {  //// 👉 "Kya same size already hai?"
        cartData[itemId][size] += 1  /// 👉 Quantity +1 kar do
      } else {
        cartData[itemId][size] = 1
      }
    } else {  /// /: Product exist nahi karta

      /* 👉 Naya product add karo + size + quantity */
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    await userModel.findByIdAndUpdate(userId, { cartData }) /// 👉 Updated cart DB me save

    res.json({ success: true, message: 'Item added to cart' }) 

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// ================= UPDATE CART =================
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body

    const userData = await userModel.findById(userId)
    let cartData = userData.cartData

    // remove item if quantity = 0
    if (quantity === 0) {
      /* 👉 Agar quantity 0 hai:👉 Item remove karna hai */
      delete cartData[itemId][size]  /////////////// 👉 Specific size remove

      if (Object.keys(cartData[itemId]).length === 0) { /////////////👉 Agar product ke andar koi size nahi bacha
        delete cartData[itemId]
      }
    } else {
      /* 👉 Agar quantity 0 nahi hai:👉 Direct update */
      cartData[itemId][size] = quantity
    }

    await userModel.findByIdAndUpdate(userId, { cartData })

    res.json({ success: true, message: 'Cart Updated' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// ================= GET USER CART =================
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body

    const userData = await userModel.findById(userId)

    res.json({
      success: true,
      cartData: userData.cartData
    })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


export { addToCart, updateCart, getUserCart }