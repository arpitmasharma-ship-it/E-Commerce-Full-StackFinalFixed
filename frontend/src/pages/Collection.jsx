import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


const Collection = () => {

    const { products, search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);   ///// 👉 mobile pe filter open/close
    const [filterProducts, setFilterProducts] = useState([]); ///// 👉 final products jo UI me dikhenge
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent')

    const toggleCategory = (e) => {
        /* e → event object (jab user kuch type karta hai ya change hota hai)
e.target → jis element pe event hua (jaise input box)
e.target.value → us input box ke andar jo value hai */
        if (category.includes(e.target.value)) { /////////👉 check:  👉 already selected hai kya?
            /* prev => ...  Ye ek callback function hai 👉 prev = previous (current) state */
            /* filter() ek array method hai jo:  👉 condition ke basis pe naya array banata hai */
            setCategory(prev => prev.filter(item => item !== e.target.value))
            /*  e.target.value  isse ham iput bol saktha hai jo ki aaya hai okey  */
            /* item !== e.target.value  👉 iska matlab: jis item ki value input ke equal hai → remove kar baaki sab keep karo */
        }
        else {
            /* old array + new value = new updated array */
            /* prev = previous (current) state */
            /* ...prev 👉 Ye purane array ko copy karta hai */
            /* ...prev, e.target.value] 👉 Matlab: purana array copy kar uske end me new value add karo */
            setCategory(prev => [...prev, e.target.value])
        }
    }


    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }


    const applyFilter = () => {

        /* 👉 Ye function products ko filter karta hai based on: 
        search text 🔍 category 📦 subCategory 🏷️ 
👉 Final filtered data → setFilterProducts me store hota hai */
        let productsCopy = products.slice(); /* ye products ki ek copy bana de ga productsCopy me  */

        if (showSearch && search) {
            /* showSearch → search bar visible hai? //  search → user ne kuch type kiya? 👉 Dono true hone par hi filter chalega */
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
            /* item.name.toLowerCase() product name ko lowercase bana diya
search.toLowerCase() user input dala usko bhi lowercase bana diya
.includes() check: kya search me jo  text  hai vo item ke name me hai? */
        }
        if (category.length > 0) {  /// Agar user ne koi category select ki hai
            productsCopy = productsCopy.filter(item => category.includes(item.category)) 
            /* agar product ki category selected categories me hai → keep nahi hai → remove */
        }



        if (subCategory.length > 0) {   /// Agar user ne koi subCategory select ki hai
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
            /* 👉 Same logic as category, bas yahan: item.subCategory check ho raha hai */
        }




        setFilterProducts(productsCopy)




    }

    const sortProducts = () => {
        let fpcopy = products.slice();
        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpcopy.sort((a, b) => (a.price - b.price)));
                break;


            case 'high-low':
                setFilterProducts(fpcopy.sort((a, b) => (b.price - a.price)));
                break;


            default:
                applyFilter();
                break;

        }
    }


/* 👉 useEffect React ka hook hai jo side effects handle karta hai */
/* “Jab kuch change ho → ye code run karo” */
/* useEffect(() => {
   // code
}, [dependencies]) */




/* [] empty dependency array 👉 Matlab: Ye sirf ek baar run hoga jab component first time load (mount) hota hai */

    useEffect(() => {
        setFilterProducts(products);

    }, [])

    useEffect(() => {
        applyFilter();

    }, [category, subCategory, showSearch, search, products])

    useEffect(() => {
        sortProducts()
    }, [sortType])

    // useEffect(() => {
    //     console.log(category)
    // }, [category])

    // useEffect(() => {
    //     console.log(subCategory)
    // }, [subCategory])



    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* Filter Options */}
            <div onClick={() => (setShowFilter(!showFilter))} className='min-w-60'>
                <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filter
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>
                {/* Category Filter  */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6  ${showFilter ? '' : 'hidden'}  sm:block `} >
                    <p className='mb-3 text-sm font-medium'>CATEGORY</p>
                    <div className='flex flex-col gap-2  text-sm  font-light text-gray-700'>
                        <p className='flex gap-2 '>
                            <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
                        </p>

                        <p className='flex gap-2 '>
                            <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Women
                        </p>

                        <p className='flex gap-2 '>
                            <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
                        </p>




                    </div>
                </div>

                {/* Sub Category */}

                <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? '' : 'hidden'}  sm:block `} >
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2  text-sm  font-light text-gray-700'>
                        <p className='flex gap-2 '>
                            <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> TopWear
                        </p>

                        <p className='flex gap-2 '>
                            <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />BottomWear
                        </p>

                        <p className='flex gap-2 '>
                            <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />WinterWear
                        </p>




                    </div>
                </div>


            </div>

            {/* Right Side  */}

            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl  mb-4 '>
                    <Title text1={'All'} text2={'Category'} />
                    {/* Product Sort  */}
                    <select onChange={(e) => setSortType(e.target.value)} className='border-2  border-gray-300 text-sm px-2'>
                        <option value="relavent">Sort by : Relavent</option>
                        <option value="high-low">Sort by : High To Low</option>
                        <option value="low-high">Sort by : Low To High</option>
                    </select>


                </div>

                {/* TO DISPLAY AND MAP ALL THE PRODUCTS FOR THAT  */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6' >

                    {
                        filterProducts.map((item, index) => (
                            < ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />

                        ))
                    }

                </div>

            </div>




        </div>
    )
}

export default Collection
