import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col sm:grid  grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='w-32 mb-5 ' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos aspernatur quia iusto accusamus possimus at, doloremque necessitatibus saepe aut in.</p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About US</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>


            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>Get In Touch</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 9784839250</li>
                <li>ArpitGOAT@gmail.com</li>

            </ul>
        </div>

        <div >
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ ArpitLimitesPrivate</p>
        </div>
      
    </div>
  )
}

export default Footer
