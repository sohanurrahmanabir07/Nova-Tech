import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { Footer } from './Footer/Footer'

export const Root = () => {


  const [products,setProducts]=useState(null)
  const [categories,setCategories]=useState(null)

  const data={
    products:products,
    categories:categories,
    setCategories:setCategories,
    setProducts:setProducts
  }

  useEffect(()=>{

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getProducts`)
    .then((res)=>{setProducts(res.data); console.log(res.data)   })
    .catch((err)=>console.log(err))


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCategories`)
    .then((res)=>{
      setCategories(res.data)
      console.log("categories",res.data)
    })
    .catch((err)=>console.log(err))




  },[])


  return (
    <div>

        <Navbar products={products} categories={categories} ></Navbar>
        <Outlet context={data} ></Outlet>
        <Footer></Footer>



    </div>
  )
}
