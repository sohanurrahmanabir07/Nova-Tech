import React from 'react'
import Amplifier from "../../../../assets/files/banner/PA_B1.jpg"
import ps from "../../../../assets/files/banner/ps_background.jpg"
import { useNavigate } from 'react-router'
export const Categories = () => {
    const navigate=useNavigate()
    const handleClick=(item)=>{
        navigate(`/category/${item}`)
    }
    return (
        <section className='flex lg:flex-wrap justify-between max-w-[1340px] mx-auto max-sm:flex-col max-sm:items-center max-sm:space-x-0 space-x-2 space-y-10 '>


            {
                [1, 2, 3, 4].map((item,index) => (
                    <div key={index} onClick={()=>handleClick(item)}  className='relative group overflow-hidden w-[300px]  rounded-lg'>
                        <img src={ps} alt="" className='rounded-lg hover:scale-105 transition-all duration-150 ease-in-out delay-110 cursor-pointer ' />
                        <p className='font-semibold text-xl absolute bottom-2 left-2 group-hover:opacity-100 opacity-0 transition-all delay-150 duration-300 ease-in-out  '>Professional Speaker</p>
                    </div>
                ))
            }



           
        </section>

    )
}
