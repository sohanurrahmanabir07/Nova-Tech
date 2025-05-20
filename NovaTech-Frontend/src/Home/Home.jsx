import React from 'react'
import { VideoBanner } from './Component/HeroSection/VideoBanner'
import { Content } from './Component/HeroSection/Content/Content'
import { SliderContent } from './Component/HeroSection/SliderContent/SliderContent'
import { Categories } from './Component/HeroSection/Category/Categories'

import { Recommended } from '../Shared Components/Recommended/Recommended'
import { StaticBanner } from '../Shared Components/Banner/StaticBanner'


export const Home = () => {
    return (
        <div className='space-y-10'>

            <VideoBanner></VideoBanner>
            <Content></Content>
            <SliderContent></SliderContent>
            <Categories></Categories>
            <StaticBanner></StaticBanner>
            <Recommended></Recommended>

        </div>
    )
}
