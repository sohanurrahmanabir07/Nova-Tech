import React from 'react'
import { capitalizeWords } from '../../Functions/functions'

export const DynamicBanner = ({ item }) => {
  return (
    <div>
      {

        !item ?
          (
            <div className="skeleton min-h-[400px] w-full " ></div>
          )
          :
          (
            <div className='relative overflow-hidden rounded-lg shadow-sm shadow-gray-400'>

              <img loading="lazy" src={` ${item?.imageUrl || `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png?20210219185637`} `} className='md:max-h-[400px] w-full aspect-3/2 md:aspect-square' alt="" />
              <div className='absolute  bottom-5 left-5'>
                <p className='font-semibold text-3xl text-gray-300 text-shadow-xl text-shadow-yellow-600'>
                  {capitalizeWords(item?.name)}
                </p>
              </div>

            </div>
          )
      }
    </div>

  )

}

