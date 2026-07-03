/* Ye tera पूरे app ka BRAIN + ENGINE + DATABASE (frontend side) hai */

/* ✅ createContext  👉 Global data share karne ke liye (React Context API)
✅ useState  👉 State store karne ke liye 
✅ useEffect 👉 Side effects (auto run code)*/

import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";   /* 👉 Static data (fake backend) */
import { toast } from "react-toastify"; /* 👉 Notification (error, success) */
import { useNavigate } from "react-router-dom";  /* 👉 Page redirect karne ke liye */
import axios from 'axios' //// Backend API call


// Create global context
export const ShopContext = createContext();

const ShopContextProvider = (props) => {   ////// 👉 Ye pura app wrap karega

    // Currency & delivery fee
    const currency = '$';
    const delivery_fee = 10;

    ///// backrend 
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // Search state
    const [search, setSearch] = useState('');

    // Toggle search bar
    const [showSearch, setShowSearch] = useState(true);

    // Cart data (IMPORTANT)
    const [cartItems, setCartItems] = useState({});

    ////// to use products from backend 
    const [products, setProducts] = useState([])

    ////////////
    const [token, setToken] = useState('')

    // Navigation
    const navigate = useNavigate()

    // ================= ADD TO CART =================
    const AddToCart = async (itemId, size) => {

        // Validation
        if (!size) {
            toast.error('Select Product Size...')
            return
        }

        // Clone cart
        let cartData = structuredClone(cartItems);

        // If product exists // 👉 Agar product already cart me hai
        if (cartData[itemId]) {

            // If size exists  // 👉 Same product + same size already hai
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {   //// 👉 Product hai but size new hai
                cartData[itemId][size] = 1;
            }
        }
        else {
            // New product
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }

        // Update state
        setCartItems(cartData);


        if (token) { //// 👉 Agar user logged in hai
            try {
                /* backendUrl + '/api/cart/add' 👉 Backend API endpoint */
                /* { itemId, size }  👉 Data send kar rahe */
                /* { headers: { token } }👉 Yaha token bhej rahe ho backend ko */
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } }) ///🔹 API CALL
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

        /* User click
↓
        Validation
↓
        Clone cart
↓
        Check product exist
↓
        Check size exist
↓
        Update quantity
↓
        setCartItems
↓
        API call (if logged in) */
    }

    // ================= GET TOTAL ITEMS =================
    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    }

    // ================= UPDATE QUANTITY =================
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    // ================= TOTAL AMOUNT =================
    const getCartAmount = () => {
        let totalAmount = 0;
        /* cartItems ek object hota hai */  /* items is the id */
        /* cartItems => 👉 Ye store karta hai: kaunsa product kitni quantity me ha */
        for (const items in cartItems) {

            // Find product
            let itemInfo = products.find(
                (product) => product._id === items // products array me se matching product nikaal rahe ho
            )

            for (const item in cartItems[items]) {   /* item is size  */
                if (cartItems[items][item] > 0) {  /// Agar quantity 0 se zyada hai tabhi calculate karega
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }
        }
        /* Cart → Product find → price × quantity → total */
        return totalAmount;
    }


    /////////
    const getProductsData = async () => {
        console.log("🔥 API CALL START");

        try {
            const url = `${backendUrl}/api/product/list`;
            console.log("👉 Calling:", url);

            const response = await axios.get(url);
            /* 👉 axios.get() = GET request bhejna 👉 await = response aane ka wait */

            console.log("🔥 RESPONSE FULL:", response);
            console.log("🔥 RESPONSE DATA:", response.data);

            if (response.data.success) {

                setProducts(response.data.products);       /* 👉 Backend se jo products aaye 👉 unko React state me store kar diya */
                console.log("✅ Products set:", response.data.products);
            } else {
                console.log("❌ API success false");
            }

        } catch (error) {
            console.log("❌ FULL ERROR:", error);
            console.log("❌ ERROR MESSAGE:", error.message);
            console.log("❌ ERROR RESPONSE:", error.response);
        }
    };


    const getUserCart = async (token) => { /* 👉 “Backend se user ka saved cart lao aur frontend me set karo” */
        try {
            const response = await axios.post(
                backendUrl + '/api/cart/get', ///// 👉 Backend route → cart fetch karega
                {}, //🔹 {} (empty body) 👉 Koi data send nahi kar rahe 👉 Kyunki user already token se identify ho raha hai
                { headers: { token } } //👉 Token backend ko diya ////// 👉 Backend ko pata chal jata hai: “Kaunsa user request bhej raha hai?”
            )

            if (response.data.success) {
                setCartItems(response.data.cartData)/* 👉 Backend se cart mila 👉 React state me store kiya */
            }
          
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

      /* User login
   ↓
Token milta hai
   ↓
getUserCart(token)
   ↓
API call (/api/cart/get)
   ↓
Backend verify token
   ↓
DB se cart fetch
   ↓
Frontend ko bhejta hai
   ↓
setCartItems()
   ↓
UI update */
    }

    useEffect(() => {
        console.log("🔥 useEffect RUN");
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])



    // Debug
    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    // Global values
    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems,
        setCartItems,   // 🔥🔥🔥 ADD THIS LINE
        AddToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken, token
    }

    // Provide to entire app
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;