import React from 'react'
import { useParams } from 'react-router'
import { DynamicBanner } from '../Shared Components/Banner/DynamicBanner'
import Amplifier from "../assets/files/banner/PA_B1.jpg"
import { ProductImage } from './ProductImage'
import { ProductDetails } from './ProductDetails'
import { ProductInfo } from './ProductInfo'
export const Product = () => {
    const { model } = useParams()
    return (

        <div className='max-w-[1440px] mx-auto px-5 space-y-10'>
            <DynamicBanner url={Amplifier} ></DynamicBanner>

            <section className='flex justify-between max-sm:flex-col md:space-x-5 max-sm:space-y-5'>

                <ProductImage></ProductImage>
                <ProductDetails></ProductDetails>
            </section>

            <section className='w-70/100 mx-auto'>
                <ProductInfo></ProductInfo>
            </section>
        </div>


    )
}
