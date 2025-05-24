import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

import Photo1 from "../../assets/Images/Product Images/RV1.png"
import Photo2 from "../../assets/Images/Product Images/NT-509FS.png"
import Photo3 from "../../assets/Images/Product Images/NT-504FS.png"
import { RecSlider } from './RecSlider'
import { useNavigate, useOutletContext } from 'react-router';
import { ProductCard } from '../../Home/Component/HeroSection/Category/Product_Category/ProductCard';

export const Recommended = () => {

    const arr = [Photo1, Photo2, Photo3]
    const products = useOutletContext().products
    const [sortedProduct, setSortedProduct] = useState([])

    useEffect(() => {

        if (products) {
            const sort = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

            setSortedProduct(sort)
        }

    }, [products])

    const settings = {
        dots: true,
        infinite: true,
        speed: 2500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        autoplay: true,
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
    return (


        <section className='md:max-w-[1340px] md:mx-auto space-y-5 p-5'>
            <p className='font-bold text-xl'>Recommended <span onClick={() => navigate('/all-products')} className='text-base font-semibold hover:scale-105 cursor-pointer'>View all <span><FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon></span></span></p>

            <section className='slider-container p-5 '>


                <Slider {...settings}>

                    {
                        products ?
                            sortedProduct && sortedProduct.map((item, index) => {
                                return (
                                    <div>
                                        <ProductCard key={index} item={item}></ProductCard>
                                    </div>

                                )
                            })
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
            </section>

        </section>
    )
}


const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`} >
            <FontAwesomeIcon icon={faArrowLeft} ></FontAwesomeIcon>
        </div>
    )
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`} >
            <FontAwesomeIcon icon={faArrowRight} className='bg-yellow-400' ></FontAwesomeIcon>
            <p>Prev</p>
        </div>
    )
}

