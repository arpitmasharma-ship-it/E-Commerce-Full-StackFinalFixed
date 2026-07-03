import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log(response.data);

      if (response.data.success) {
        setList(response.data.products); // assuming backend returns products array
      }
      else{
        toast.error(response.data.mesaage)
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  ////// to use remove okey 
  const removeProduct = async (id) => {
  try {
    const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, {headers:{token}});

    if (response.data.success) {
      toast.success(response.data.message);
      // Optionally refresh product list after deletion
     await fetchList();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error removing product:", error);
    toast.error(error.message || "Something went wrong");
  }
};



  useEffect(() => {
    fetchList();
  }, []);

return (
    <div>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ------- List Table Title ----------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------- Product ----------- */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border rounded-md"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency  }{item.price}</p>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => removeProduct(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
