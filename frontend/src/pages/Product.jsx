import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'   /* 👉 URL se data nikalta hai */
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ReleatedProducts from '../components/ReleatedProducts';

const Product = () => {
  /* Example: /product/123 👉 productId = 123 */
  const { productId } = useParams(); //// ye url se value niklana me kaam aata hai and yeha value hai productId
  const { products, currency, AddToCart } = useContext(ShopContext)
  // console.log(productId);
  const [productData, setProductData] = useState(false); //// productData = actual product object
  const [image, setImage] = useState('') ///// 👉 Currently selected image
  const [size, setSize] = useState('');  ////// 👉 User ka selected size


  const fetchProductData = async () => { ////// 👉 Function banaya product find karne ke liye
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        console.log(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    /* First render pe
Jab productId change ho
Jab products change ho */
    fetchProductData();
  }, [productId, products])

  return productData ? ( ////// yeha productData pe turnery opertaor laga hua hai /* 👉 Agar data mil gaya: ✔ UI show karo 👉 Agar nahi: ✔ empty div */
    <div className='border-t-2 pt-10 transition-opacity ease-in  duration-500 opacity-100'>
      {/* Product Data  */}
      <div className='flex gap-12 sm:gap-12  flex-col sm:flex-row'>

        {/* Product Image   */}
        <div className='flex-1 flex  flex-col-reverse gap-3 sm:flex-row'>  {/* muje ye ulrta kyu lag rah hai media query  */}
          {/* flex-col-reverse 👉 images neeche, main image upar &&&& sm:flex-row 👉 normal layout*/}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-[18.7%]  w-full'>
            {
              productData.image.map((item, index) => ( /* 👉 Har image ke liye thumbnail */
                /* 👉 Click → main image change  ////  <img src={image} /> ===> 👉 Selected image show ho rahi hai */
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full flex-shrink-0 cursor-pointer' />

              ))
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* ----------PRODUCT  INFORMATION----------------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          <div className='flex items-center gap-1 mt-2' > {/* items-center is important here  */}
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_dull_icon} alt="" className='w-3 5' />
            <p className='pl-2'>(100k)</p>
          </div>

          <p className='text-3xl mt-5 font-medium '  >{currency}{productData.price}</p>
          <p className='text-gray-400 w-4/5 mt-5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8 '>
            <p>Select Size</p>
            <div className='flex gap-2 '>
              {productData.sizes.map((item, index) => (
                /* item===size ? 'border-orange-500' : '' 👉 Selected size highlight */
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100  cursor-pointer ${item === size ? 'border-orange-500 ' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>

          <button onClick={() => AddToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm  active:bg-gray-700 cursor-pointer '>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 ' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1 '>
            <p>100% Original Product</p>
            <p>Cash On Delivery is available on this product </p>
            <p>Easy return and exchange policy within 7 Days</p>

          </div>
          </div>

      </div>

      {/* Description and Review Section  */}

      <div className='mt-20' >
        <div className='flex'>
          <b className='border px-5 py-3 text-sm' >Description</b>
          <p className='border px-5 py-3 text-sm'> Reviews-(122k) </p>
        </div>

        <div className='flex flex-col gap-4 border px-6 text-sm text-gray-500 '>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam deleniti vero porro, architecto tempora veniam, provident adipisci molestiae distinctio a omnis numquam facere recusandae eos illum repudiandae voluptatibus nobis repellat dicta non! Corrupti reiciendis tempora libero fuga, labore, commodi sunt porro laborum, laboriosam voluptatum recusandae in harum eligendi unde quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam deleniti vero porro, architecto tempora veniam, provident adipisci molestiae distinctio a omnis numquam facere recusandae eos illum repudiandae voluptatibus nobis repellat dicta non! Corrupti reiciendis tempora libero fuga, labore, commodi sunt porro laborum, laboriosam voluptatum recusandae in harum eligendi unde quidem.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nemo nam similique blanditiis inventore excepturi rem asperiores obcaecati omnis dolore molestias dignissimos at cum, facilis molestiae consequatur. Error quam at beatae sapiente ad dolorem odit. Eum veniam, perspiciatis voluptatem cupiditate repellat sequi quos aut rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam deleniti vero porro, architecto tempora veniam, provident adipisci molestiae distinctio a omnis numquam facere recusandae eos illum repudiandae voluptatibus nobis repellat dicta non! Corrupti reiciendis tempora libero fuga, labore, commodi sunt porro laborum, laboriosam voluptatum recusandae in harum eligendi unde quidem.
          </p>
        </div>

      </div>

      {/* Display Releated Products  */}

      <ReleatedProducts category={productData.category} subCategory={productData.subCategory} />


    </div>
  ) : <div className='opacity-0'>

  </div>
}

export default Product