import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

export const Root = () => {


  const [products,setProducts]=useState(null)
  const [categories,setCategories]=useState(null)

  const data={
    products:products,
    categories:categories
  }

  useEffect(()=>{

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getProducts`)
    .then((res)=>setProducts(res.data))
    .catch((err)=>console.log(err))


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCategories`)
    .then((res)=>setCategories(res.data))
    .catch((err)=>console.log(err))




  },[])


  return (
    <div>

        <Navbar products={products} categories={categories} ></Navbar>
        <Outlet context={data} ></Outlet>



    </div>
  )
}
