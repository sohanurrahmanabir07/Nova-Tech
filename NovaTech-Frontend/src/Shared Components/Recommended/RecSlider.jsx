import React from 'react'
import Slider from "react-slick";

export const RecSlider = ({ photos }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        customPaging: function () {
            return (
                <div className="w-2 h-2 rounded-full mt-2  bg-gray-400 transition-all duration-300"></div>
            );
        },

        appendDots: dots => (
            <div>
                <ul className="flex justify-center gap-3 mt-4">{dots}</ul>
            </div>
        ),

    };
    return (
        <div className="slider-container p-6 w-[350px] rounded-lg border-2 border-gray-400  overflow-hidden">
            <div>
                <p className='text-xl font-semibold '>Indoor System</p>
            </div>
            <Slider {...settings}>
                {
                    photos.map((item, index) => {
                        return (
                            <div key={index}>
                                <img className=' w-full h-full rounded-lg' src={item} alt="" />
                              
                                    <p className='text-lg font-semibold '>NT-507</p>
                              

                            </div>
                        )
                    })
                }
            </Slider>


        </div>
    )
}
