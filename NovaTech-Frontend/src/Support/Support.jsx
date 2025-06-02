import React, { useState } from 'react'
import { StaticBanner } from '../Shared Components/Banner/StaticBanner'
import BannerImage from "../assets/files/banner/support5.jpg"
import supportImage from "../assets/files/icon/technical-support.png"
import maintenaceImage from "../assets/files/icon/maintenace.png"
import salesImage from "../assets/files/icon/sale.png"
import { SupportModal } from './SupportModal'
export const Support = () => {

    const [support,setSupport]=useState(null)
    const handleModal=(v)=>{
        setSupport(v)
        document.getElementById('supportModal').checked=true

    }
    return (
        <div className='max-w-[1340px] mx-auto space-y-10 min-h-screen'>

            <StaticBanner BannerImg={BannerImage} BannerText={'Nova Officail Support '}  ></StaticBanner>

            <br />
            <br />

            <div className='text-center'>
                <p className='font-bold md:text-5xl text-3xl text-emerald-950'>Nova Support</p>
            </div>
            <div className='flex md:justify-around my-20 max-sm:flex-col max-sm:items-center max-sm:space-y-5'>
                <div   className='rounded-lg w-[300px] px-10 py-5 shadow-2xl shadow-blue-500 cursor-pointer  flex  items-center flex-col bg-yellow-200' onClick={()=>handleModal('Techinal Assitance')} >
                    <img src={supportImage} className='w-[100px]' alt="" />
                    <p className='text-xl font-semibold'>Technical Assistance</p>
                </div>
                <div className='rounded-lg w-[300px] px-10 py-5 shadow-2xl shadow-blue-500 cursor-pointer flex  items-center flex-col bg-yellow-200' onClick={()=>handleModal('Repair & Maintenance')}>
                    <img src={maintenaceImage} className='w-[100px]' alt="" />
                    <p className='text-xl font-semibold'>Repair & Maintenance</p>
                </div>
                <div className='rounded-lg w-[300px] px-10 py-5 shadow-2xl cursor-pointer shadow-blue-500  flex  items-center flex-col bg-yellow-200' onClick={()=>handleModal('Sales & Billing Support')}>
                    <img src={salesImage} className='w-[100px]' alt="" />
                    <p className='text-xl font-semibold'>Sales & Billing Support</p>
                </div>
            </div>
            
            <SupportModal supportTitle={support}></SupportModal>

        </div>
    )
}
