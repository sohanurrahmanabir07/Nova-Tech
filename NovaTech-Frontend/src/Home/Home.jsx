import React, { useEffect } from 'react'
import { VideoBanner } from './Component/HeroSection/VideoBanner'
import { Content } from './Component/HeroSection/Content/Content'
import { SliderContent } from './Component/HeroSection/SliderContent/SliderContent'
import { Categories } from './Component/HeroSection/Category/Categories'

import { Recommended } from '../Shared Components/Recommended/Recommended'
import { StaticBanner } from '../Shared Components/Banner/StaticBanner'
import { useOutletContext } from 'react-router'
import CustomSlider from '../Shared Components/Banner/Slider Banner/CustomSlider'
import CenterMode from '../Shared Components/Banner/Slider Banner/CenterMode'


export const Home = () => {

    const context=useOutletContext()
    return (
        <div className='space-y-10'>

            {/* <VideoBanner></VideoBanner>
            <CustomSlider></CustomSlider> */}
            <CenterMode></CenterMode>
            {/* <Content></Content> */}
            <SliderContent></SliderContent>
            <Categories categories={context.categories}></Categories>
            <StaticBanner></StaticBanner>
            <Recommended></Recommended>

        </div>
    )
}
