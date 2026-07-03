import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: "dfd9g6e6s",
      api_key: "614467643183648",
      api_secret: "bTEoHOJZSj5WFAI-vXpZTFfsgP8",
    });

    console.log("Cloudinary Connected ✅");
  } catch (error) {
    console.log(error);
  }
};

export default connectCloudinary;