import React, { useState, useRef, useEffect } from 'react';
import Photo1 from "../assets/files/PA Images/NT-60APA/23.png";
import Photo2 from "../assets/files/PA Images/NT-60APA/24.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

// Custom Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        right: '10px',
        zIndex: 2,
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: 'gray'
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCircleArrowRight} size="2x" />
    </div>
  );
};

// Custom Prev Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '10px',
        zIndex: 2,
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: 'gray',
        opacity:'50'
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" />
    </div>
  );
};

export const ProductImage = () => {
  const imageArr = [Photo1, Photo2];

  const [nav1, setNav1] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    setNav1(sliderRef.current);
  }, []);

  const settings = {
    asNavFor: nav1,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <section className='md:w-1/2 px-6 py-4 bg-gray-100 rounded-lg mx-auto'>
      <div className="flex flex-row gap-4 max-h-[500px] relative">
        {/* Thumbnails */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
          {imageArr.map((img, index) => (
            <div
              key={index}
              onClick={() => sliderRef.current.slickGoTo(index)}
              className="cursor-pointer border-2 border-gray-300 rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-200"
            >
              <img
                src={img}
                alt={`thumb-${index}`}
                className="w-24 h-24 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Main Image Slider */}
        <div className="flex-1 max-h-[500px] overflow-hidden relative">
          <Slider {...settings} ref={sliderRef}>
            {imageArr.map((item, index) => (
              <div key={index} className="flex justify-center items-center h-[300px]">
                <img
                  src={item}
                  alt={`slide-${index}`}
                  className="max-h-full object-contain rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
