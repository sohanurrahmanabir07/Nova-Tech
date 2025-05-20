import React from 'react'
import Banner from "../../assets/files/banner/MBG.jpg"
export const StaticBanner = () => {
  return (
    <div className='relative flex items-center justify-center rounded-lg max-w-[1440px] md:px-10 m-auto '>

        <img src={Banner} className=' w-full overflow-hidden rounded-lg md:aspect-4/2' alt="" />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center md:space-y-5'>
            <p className='font-bold text-gray-200 md:text-2xl'>NOVA Audio Innovations</p>
            <p className=' text-gray-200 text-base font-semibold'>Highlighting the advanced audio solutions your <br /> company offers.</p>
            <button className='md:px-10 md:py-5 bg-gray-200 text-black rounded-lg cursor-pointer hover:scale-105 transition-all delay-150 duration-300'>View Details</button>
        </div>

    </div>
  )
}
