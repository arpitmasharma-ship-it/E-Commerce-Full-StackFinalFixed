
1)  # firsly timestamp 5.57   here we have added userRegister function in the route with an endpoint of /register and then we have added this route in server.js with the endpoint /api/user    and the we did post check on the thunder capi check okey 


2) # 5.10 and 7.25 are the important timestam for the installation of the dependencies okey 







pproductControllers.js  File


import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js";
import fs from "fs";
import axios from "axios";

import FormData from "form-data";


//// function for adding the products 
const addproduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const images = [];

        if (req.files?.image1) images.push(req.files.image1[0].path);
        if (req.files?.image2) images.push(req.files.image2[0].path);
        if (req.files?.image3) images.push(req.files.image3[0].path);
        if (req.files?.image4) images.push(req.files.image4[0].path);

        console.log("FILES:", images);

        // 🔥 YAHI ADD KARNA HAI (UPLOAD SE PEHLE)
        const test = await cloudinary.api.ping();
        console.log("PING:", test);

   let imageUrl = [];

for (let item of images) {

    const formData = new FormData();
    formData.append("file", fs.createReadStream(item));
    formData.append("upload_preset", "mern_products"); // 🔥 MUST

    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
        formData,
        {
            headers: formData.getHeaders()
        }
    );
      console.log("Uploaded URL:", response.data.secure_url); // 🔥 ADD THIS

    imageUrl.push(response.data.secure_url);

    fs.unlinkSync(item); // 🔥 optional (cleanup)
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
        const products = await productModel.find({});

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
        const { id } = req.body;

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
        const { id } = req.body;

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









////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////