import React from 'react'
import { useNavigate } from 'react-router'
import { capitalizeWords } from '../../../../../Functions/functions'


export const ProductCard = ({item}) => {
    const navigate=useNavigate()

  return (
    <div onClick={()=>navigate(`/products/${item?.model}`)}  className='bg-gray-200 w-[320px] text-xl font-semibold p-5 cursor-pointer rounded-xl'>

        <img src={item?.imageUrl[0]} className='w-[300px] rounded-xl ' alt="" />
        <p>{ item?.model?.toUpperCase() }</p>
        <p>{ capitalizeWords(item?.category) }</p>

    </div>
  )
}
