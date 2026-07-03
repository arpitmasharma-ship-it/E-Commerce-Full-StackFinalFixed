import { StrictMode } from 'react'   ///// React ka debugging tool hai
import { createRoot } from 'react-dom/client'
import './index.css'  /////Global CSS (Tailwind + fonts)  /// ager ye nai lagayage to tailwind nai chalega okey 
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'



createRoot(document.getElementById('root')).render(  ///// ✔️ Yeh HTML ke <div id="root"> me React inject karta hai
  <BrowserRouter>  {/* 👉 Routing enable karta hai (URL change = page change) */}
    <ShopContextProvider>  {/* 👉 Global state (cart, products, search, etc) */}
      <App />   {/* 👉 Yeh pura app ka main component hai */}
    </ShopContextProvider>   {/* Global state accessible everywhere */}
  </BrowserRouter>,
)
