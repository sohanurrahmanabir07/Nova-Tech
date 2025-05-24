import React from 'react'
import { capitalizeWords } from '../Functions/functions'

export const ProductDetails = ({item}) => {
    return (
        <div className='md:w-1/2 p-5'>
            <p className='font-bold text-2xl '>
                {item?.model.toUpperCase()}
            </p>
            <p className='font-semibold text-lg'>{capitalizeWords(item?.category)}</p>
            <br />
            <p className='text-base font-semibold'>
                {item?.description}
            </p>
        </div>
    )
}
