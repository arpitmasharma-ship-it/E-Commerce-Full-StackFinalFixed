import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col  justify-center  gap-6  md:w-2/4 text-gray-600 '>
        <p>Durga Mata (Mother Durga) is a principal Hindu goddess, revered as the supreme embodiment of Shakti (universal feminine power), energy, and protector against evil.</p>
        <p className='font-medium text-2xl'>Hello I Am Arpit Sharma Founder Of This Website Here You Will Get All Types Of Products</p>
          <p>We are a modern e-commerce clothing platform dedicated to bringing you the latest trends with comfort, quality, and affordability. Our collection is carefully curated to suit every style, from casual everyday wear to stylish outfits for special occasions. We believe that fashion should be accessible to everyone, which is why we focus on delivering high-quality products at reasonable prices.</p>
          <p>We offer trendy and stylish clothing for all occasions
            High-quality products at affordable prices
            Wide range of collections for men and women
            Easy and user-friendly shopping experience
            Secure payment options
            Fast and reliable delivery
            Regular updates with latest fashion trends
            Customer satisfaction is our top priority</p>

          <b className='text-gray-800' >Our Mission</b>
          <p>To provide high-quality and trendy clothing to everyone
            To make fashion affordable and accessible
            To deliver a smooth and enjoyable online shopping experience
            To stay updated with the latest fashion trends
            To ensure customer satisfaction and trust
            To offer fast and reliable delivery services
            To continuously improve our products and services</p>

            <p>Frontend ended at 5.10</p>
            <p>npms explanations 5.13</p>

        </div>

      </div>

      <NewsletterBox/>
    </div>


  )
}

export default About
