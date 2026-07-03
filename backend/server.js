import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);


import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from "./routes/orderRoute.js";
// App Config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary();
console.log("NAME:", process.env.CLOUDINARY_NAME);
console.log("KEY:", process.env.CLOUDINARY_API_KEY);
console.log("SECRET:", process.env.CLOUDINARY_SECRET_KEY);



//// api check
app.get('/', (req, res) => {
  res.send("API Working")
})

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter);
app.use("/api/order", orderRouter);


app.listen(port, () => console.log('Server Startes on Port :' + port))