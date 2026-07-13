import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'

import { toast } from 'react-toastify'

const Add = ({token}) => {


    //////  state variabkles to store images 
    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)


    /////// state variable to store name 
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Men")
    const [subCategory, setSubCategory] = useState("Topwear")
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])




const onSumbitHandler = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));

    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);

    console.log("Backend URL:", backendUrl);
    console.log("Request URL:", `${backendUrl}/api/product/add`);
    console.log("Token:", token);

    const response = await axios.post(
      `${backendUrl}/api/product/add`,
      formData,
      {
        headers: {
          token,
        },
      }
    );

    console.log(response.data);

    if (response.data.success) {
      toast.success(response.data.message);

      setName("");
      setDescription("");
      setPrice("");
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
      setSizes([]);
      setBestseller(false);
      setCategory("Men");
      setSubCategory("Topwear");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
};


   










   return (
  <div className="w-full">
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Add New Product
        </h1>

        <p className="text-gray-500 mt-2">
          Create a premium product for your ASPrime store.
        </p>
      </div>

      <form
        onSubmit={onSumbitHandler}
        className="flex flex-col gap-8"
      >

        {/* Upload Images */}

        <div>

          <h2 className="font-semibold text-gray-700 mb-4">
            Product Images
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {[
              { image: image1, setImage: setImage1, id: "image1" },
              { image: image2, setImage: setImage2, id: "image2" },
              { image: image3, setImage: setImage3, id: "image3" },
              { image: image4, setImage: setImage4, id: "image4" },
            ].map((item) => (
              <label
                key={item.id}
                htmlFor={item.id}
                className="cursor-pointer"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-2xl h-40 flex items-center justify-center hover:border-indigo-500 hover:bg-indigo-50 duration-300 overflow-hidden">

                  <img
                    src={
                      item.image
                        ? URL.createObjectURL(item.image)
                        : assets.upload_area
                    }
                    className="w-full h-full object-cover"
                  />

                </div>

                <input
                  hidden
                  id={item.id}
                  type="file"
                  onChange={(e) =>
                    item.setImage(e.target.files[0])
                  }
                />

              </label>
            ))}

          </div>

        </div>

        {/* Name */}

        <div>

          <label className="font-semibold text-gray-700">
            Product Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nike Air Jordan..."
            className="mt-2"
          />

        </div>

        {/* Description */}

        <div>

          <label className="font-semibold text-gray-700">
            Product Description
          </label>

          <textarea
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a premium product description..."
            className="mt-2 resize-none"
          />

        </div>

        {/* Category */}

        <div className="grid md:grid-cols-3 gap-6">

          <div>

            <label className="font-semibold">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="mt-2"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>

          </div>

          <div>

            <label className="font-semibold">
              Sub Category
            </label>

            <select
              value={subCategory}
              onChange={(e) =>
                setSubCategory(e.target.value)
              }
              className="mt-2"
            >
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>

          </div>

          <div>

            <label className="font-semibold">
              Price
            </label>

            <input
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              type="number"
              placeholder="$199"
              className="mt-2"
            />

          </div>

        </div>

        {/* Sizes */}

        <div>

          <label className="font-semibold">
            Available Sizes
          </label>

          <div className="flex gap-4 mt-4 flex-wrap">

            {["S", "M", "L", "XL", "XXL"].map((size) => (

              <button
                type="button"
                key={size}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((item) => item !== size)
                      : [...prev, size]
                  )
                }
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300
                ${
                  sizes.includes(size)
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 hover:bg-indigo-100"
                }`}
              >
                {size}
              </button>

            ))}

          </div>

        </div>

        {/* Bestseller */}

        <div className="flex items-center gap-3">

          <input
            id="bestseller"
            type="checkbox"
            checked={bestseller}
            onChange={() =>
              setBestseller(!bestseller)
            }
          />

          <label
            htmlFor="bestseller"
            className="font-medium cursor-pointer"
          >
            Add to Bestseller
          </label>

        </div>

        {/* Button */}

             <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] shadow-xl"
        >
          + Add Product
        </button>

      </form>

    </div>
  </div>
);

}   // <-- Missing

export default Add;