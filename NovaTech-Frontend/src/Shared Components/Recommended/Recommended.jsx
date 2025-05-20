import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Slider from "react-slick";

import Photo1 from "../../assets/Images/Product Images/RV1.png"
import Photo2 from "../../assets/Images/Product Images/NT-509FS.png"
import Photo3 from "../../assets/Images/Product Images/NT-504FS.png"
import { RecSlider } from './RecSlider'

export const Recommended = () => {

    const arr = [Photo1, Photo2, Photo3]
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className=' bg-gray-200 flex justify-center items-center my-5 '>

            <section className='md:max-w-[1340px] md:mx-auto space-y-5 p-5'>
                <p className='font-bold text-xl'>Recommended <span className='text-base font-semibold hover:scale-105 cursor-pointer'>View all <span><FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon></span></span></p>

                <section className='slider-container p-5 '>
                    <Slider {...settings}>
                        <RecSlider photos={arr} ></RecSlider>
                        <RecSlider photos={arr} ></RecSlider>
                        <RecSlider photos={arr} ></RecSlider>
                        <RecSlider photos={arr} ></RecSlider>
                    </Slider>
                </section>

            </section>




        </div>
    )
}


const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return(
      <div onClick={onClick} className={`arrow ${className}`} >
        <FontAwesomeIcon icon={faArrowLeft} ></FontAwesomeIcon>
      </div>
    )
    }

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return(
      <div onClick={onClick} className={`arrow ${className}`} >
         <FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon>
         <p>Prev</p>
      </div>
    )
  }

