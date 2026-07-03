import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'Contact'} text2={'Us'}/>
      </div>
<div className='my-10 flex                                                                                                                                                                                                                           flex-col justify-center  md:flex-row gap-10 mb-28 '>
  <img className='w-full  md:max-w-[450px]' src={assets.contact_img} alt="" />
  <div className='flex flex-col items-center justify-center gap-6 '>
    <p className='font-semibold text-xl text-gray-600' >Our Store </p>
    <p>Bolo Ambe Mata Ki Jai<br />  302027 AKS Stores <br />India , Rajasthan , Jaipur <br /> JECRC Foundation</p>
    <p>TelePhone : 9784639825 <br />  <span className='font-semiblack'>Email : MatajiStores@gmail.com <br />Shankarjii@gmail.com</span></p>
    <p className='font-semibold text-gray-600'>Careers On MY Sites</p>
    <p>Learn More About My Team And Jobs To Apply </p>
    <p className='border border-gray-500 bg-black text-white border-2 p-2 mt-2 pl-5 cursor-pointer hover:bg-gray-800 hover:text-white  rounded-4xl '    >Explore Jobs...</p>

  </div>
</div>
<NewsletterBox/>

    </div>
  )
}

export default Contact
