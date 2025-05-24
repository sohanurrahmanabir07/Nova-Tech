import React from 'react'
import Amplifier from "../../../../assets/files/banner/PA_B1.jpg"
import ps from "../../../../assets/files/banner/ps_background.jpg"
import { useNavigate } from 'react-router'
import { capitalizeWords, urlConverter } from '../../../../Functions/functions'

import Slider from "react-slick";
export const Categories = ({ categories }) => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const navigate = useNavigate()
    const handleClick = (item) => {
        navigate(`/category/${urlConverter(item?.name)}`)
    }

    console.log('categories', categories)
    return (

        <section className='max-w-[1340px] mx-auto '>
            <div className="slider-container  overflow-hidden rounded-lg max-sm:px-5  space-y-10 ">

                <Slider {...settings}>

                    {
                        categories ?

                            categories && categories.map((item, index) => (
                                <section className='px-5'>
                                    <div key={index} onClick={() => handleClick(item)} className='group w-[300px] h-[200px]  relative overflow-hidden rounded-lg'>
                                        <img src={item?.imageUrl? item?.imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'  } alt="" className='rounded-lg w-full h-full shadow-xl shadow-blue-500 max-sm:w-full object-cover  hover:scale-105 transition-all duration-150 ease-in-out delay-110 cursor-pointer ' />
                                        <p className='font-semibold text-xl absolute bottom-2 left-2  '>{capitalizeWords(item?.name)}</p>
                                    </div>
                                </section>

                            ))
                            :
                            [1, 2, 3, 4, 5, 6].map((item, index) => {
                                return (
                                    <div>
                                        <div className="flex w-[320px] flex-col space-y-3">
                                            <div className="skeleton h-[200px] w-full"></div>
                                            <div className="skeleton h-4 w-28"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                        </div>
                                    </div>

                                )
                            })
                    }
                </Slider>
            </div>


        </section>


    )
}
