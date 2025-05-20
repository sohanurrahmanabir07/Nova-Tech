import React from 'react'
import { useNavigate } from 'react-router'

export const ProductCard = ({url}) => {
    const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`/products/${`NT-120`}`)}  className='bg-gray-200 w-[350px] text-xl font-semibold p-5 cursor-pointer rounded-xl'>

        <img src={url} alt="" />
        <p>NT-120</p>
        <p>PA Amplifier</p>

    </div>
  )
}
