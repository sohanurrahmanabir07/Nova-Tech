import React from 'react'
import { useParams } from 'react-router'
import { DynamicBanner } from '../../../../../Shared Components/Banner/DynamicBanner'
import Amplifier from "../../../../../assets/files/banner/PA_B1.jpg"
import AmplifierPhoto1 from "../../../../../assets/files/PA Images/NT-120/26.png"
import AmplifierPhoto2 from "../../../../../assets/files/PA Images/NT-120/27.png"
import { ProductCard } from './ProductCard'
export const Category = ({ url }) => {
  const { categoryName } = useParams()

  return (
    <div className='max-w-[1440px] mx-auto space-y-5'>

      <DynamicBanner url={Amplifier} ></DynamicBanner>

      <section className='flex justify-center items-center my-5'>
        <div className='grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-3'>
        {/* ____here products details will be provided instead of url____ */}

        
          <ProductCard url={AmplifierPhoto1} ></ProductCard> 
          <ProductCard url={AmplifierPhoto2} ></ProductCard>
          <ProductCard url={AmplifierPhoto1} ></ProductCard>
          <ProductCard url={AmplifierPhoto2} ></ProductCard>
          <ProductCard url={AmplifierPhoto1} ></ProductCard>
          <ProductCard url={AmplifierPhoto2} ></ProductCard>
        </div>
      </section>









    </div>
  )
}
