/* 👉 Ye 4 APIs bana rahi hai:

addproduct → product add + image upload (Cloudinary)
listproduct → sab products lana
removeproduct → product delete
singleproduct → ek product ka data */



import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js";
import fs from "fs"; /* 👉 File system module (Node.js) Use: local files read karna delete karna */
import axios from "axios";  /* 👉 HTTP requests bhejne ke liye (Cloudinary API call) */

import FormData from "form-data";  /* 👉 File upload ke liye multipart/form-data banata hai */


//// function for adding the products 
/* SABSE JYADA ERROR ADDPRODUCT NE CREATE KIYE HAI CLOUDINARY KO LEKER  */
const addproduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const images = [];  /* 👉 Empty array (temporary storage for file paths) */
        /* req.files → multer middleware deta hai */
        /* image1[0].path → file ka local path */

        /* 👉 req.files kya hota hai?
Jab tum backend me file upload karte ho (mostly using multer), tab files yahan aati hain
Structure kuch aisa hota hai:
req.files = {
  image1: [ { path: "uploads/img1.jpg" } ],
  image2: [ { path: "uploads/img2.jpg" } ]
} */

        /* 🔸 1. if (req.files?.image1)
      
      👉 Yeh check karta hai:
      
      ✔ Step-by-step:
      req.files exist karta hai ya nahi?
      ?. → optional chaining (safe access)
      Agar req.files undefined hua → error nahi aayega ❌
      Fir check karega → image1 hai ya nahi
      ✔ Matlab:
      "Agar user ne image1 upload ki hai tab hi aage badho" */

        /* 🔸 2. images.push(req.files.image1[0].path)
  
  👉 Ab actual kaam ho raha hai
  
  ✔ Breakdown:
  req.files.image1 → array hai
  [0] → first file
  .path → file ka server path */
        if (req.files?.image1) images.push(req.files.image1[0].path);
        if (req.files?.image2) images.push(req.files.image2[0].path);
        if (req.files?.image3) images.push(req.files.image3[0].path);
        if (req.files?.image4) images.push(req.files.image4[0].path);

        console.log("FILES:", images);

        // 🔥 YAHI ADD KARNA HAI (UPLOAD SE PEHLE)
        const test = await cloudinary.api.ping();  ///// 👉 Cloudinary server ko ping karta hai
        console.log("PING:", test);

        let imageUrl = []; ////// 👉 Yaha Cloudinary ke URLs store honge

        for (let item of images) { //// Har image ke liye loop
            /* 🤔 Multipart kya hota hai?
            Jab file upload hoti hai → normal JSON se nahi hoti
            Special format use hota hai: multipart/form-data */
            const formData = new FormData(); ///// 👉 Multipart form create
            /* createReadStream(item) = file ko stream me read karna */
            /* 🤔 Stream kya hota hai? 👉 File ko ek baar me load nahi karta (memory save karta hai) */
            formData.append("file", fs.createReadStream(item)); /////* 👉 Internally: file read ho rahi hai stream me memory efficient upload */
            formData.append("upload_preset", "mern_products"); // 🔥 MUST
            /* 🔸 5. formData.append("upload_preset", "mern_products");
👉 Cloudinary ka preset config
✔ Yeh kya karta hai?
Kaise upload hoga
Folder kya hoga
Public/private
💡 Without this → upload fail ho jayega ❌ */

            const response = await axios.post( /// "Ek HTTP POST request bhej rahe ho Cloudinary ko jisme file (image) upload ho rahi hai"
                /* axios kya hai? Ek HTTP client (library) Backend se API call karne ke liye use hota hai */
                /* ✔ .post() ka matlab:"Server ko data bhejna" */
                /* await very important:"Jab tak API se response na aa jaye tab tak wait karo" */
                `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, /// 👉 Yeh API endpoint hai jahan request ja rahi hai
                formData,
                {
                    headers: formData.getHeaders() //// 👉 Yeh HTTP headers set kar raha hai
                }
            );
            console.log("Uploaded URL:", response.data.secure_url); // 🔥 ADD THIS

            imageUrl.push(response.data.secure_url);
            /* 🔹 Step 1: response.data.secure_url 👉 Yeh kaha se aaya? Jab tum Cloudinary pe image upload karte ho Woh ek response deta hai */

            fs.unlinkSync(item); // 🔥 optional (cleanup) ///"Jo file server pe temporary stored hai usko hata do"
        }
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: sizes ? JSON.parse(sizes) : [],
            image: imageUrl, // ✅ FIXED (use cloudinary URLs)
            date: Date.now()
        };

        const product = new productModel(productData)
        await product.save()

        res.json({
            success: true,
            message: "Product Added",
            product
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};


//// function for list product 
const listproduct = async (req, res) => {
    try {
        console.log("LIST API HIT"); // 🔥

        const products = await productModel.find({});
        /* ✔ {} ka matlab: "Sabhi documents lao" */
        console.log("Products:", products); // 🔥

        res.json({
            success: true,
            products
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}


//// function for Removing the product 
const removeproduct = async (req, res) => {
    try {
        const { id } = req.body; //// "Jo product delete karna hai uska ID nikaalo"

        await productModel.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Product Removed"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}


//// function for single product info 
const singleproduct = async (req, res) => {
    try {
        const { id } = req.body; //// jo bhi single product cahaiye uski i le lo body se 

        const product = await productModel.findById(id);

        if (!product) {
            return res.json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.json({
            success: true,
            product
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}


export { addproduct, listproduct, removeproduct, singleproduct }    