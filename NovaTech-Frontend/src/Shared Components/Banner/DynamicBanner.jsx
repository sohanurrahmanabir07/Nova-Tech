import React from 'react'

export const DynamicBanner = ({url}) => {
  return (
    <div className='relative overflow-hidden rounded-lg'>

        <img src={url}  alt="" />
        <div className='absolute  bottom-5 left-5'>
            <p className='font-semibold text-xl text-gray-300'>
                Public Address (PA) Amplifier
            </p>
        </div>

    </div>
  )
}
