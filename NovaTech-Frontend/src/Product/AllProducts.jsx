import React, { useState } from 'react'
import Cover from "../assets/files/banner/cover.jpg"
import { ProductCard } from '../Home/Component/HeroSection/Category/Product_Category/ProductCard'
import Amplifier from "../assets/files/PA Images/NT-40WPA/34.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
export const AllProducts = () => {
    const [limit, setLimit] = useState(5)
    return (
        <div className='max-w-[1440px] mx-auto space-y-5 mb-20'>

            <div className='h-[400px] bg-amber-200 relative max-sm:hidden overflow-hidden rounded-lg'>
                <img src={Cover} className='object-center w-full absolute' alt="" />
            </div>


            <div className='w-full h-[50px] bg-gray-100 rounded-lg flex items-center justify-center my-10'>
                <div className='w-3/4 relative md:w-2/5'>
                    <div className='px-2 rounded-sm border-1 border-gray-500 flex items-center'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' ></FontAwesomeIcon>
                        <input type="text" name="" placeholder='Search Product' className='p-2 w-full focus:outline-none' id="" />

                    </div>


                    <div className='relative'>
                        <div className='bg-gray-100 absolute w-full p-2 border border-gray-200 z-50'>
                            <ul className="list-none">
                                <li className='font-semibold hover:bg-blue-400 hover:text-gray-300 cursor-pointer'>Amplifier</li>
                                <li className='font-semibold hover:bg-blue-400 hover:text-gray-300 cursor-pointer'>Amplifier</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>


            <section className='flex justify-center items-center'>
                <section className='space-y-2'>
                    <div className='flex flex-row-reverse'  >
                        <div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn m-1 w-[150px] rounded-sm">Filter <FontAwesomeIcon icon={faFilter} ></FontAwesomeIcon></div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 font-semibold shadow-sm">
                                    <li><a>PA Amplifier</a></li>
                                    <li><a>Fashion Speaker</a></li>
                                </ul>
                            </div>
                        </div>


                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-3'>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, limit).map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ProductCard url={Amplifier} ></ProductCard>
                                    </div>
                                )
                            })

                        }

                    </div>


                </section>

            </section>




        </div>
    )
}
