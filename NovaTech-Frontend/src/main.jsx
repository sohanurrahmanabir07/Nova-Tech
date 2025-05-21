import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './Root.jsx'
import { Home } from './Home/Home.jsx'
import { Category } from './Home/Component/HeroSection/Category/Product_Category/Category.jsx'
import { Product } from './Product/Product.jsx'
import { AllProducts } from './Product/AllProducts.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/category/:categoryName",
        element: <Category></Category>,


      },
      {
        path: "/products/:model",
        element: <Product></Product>
      },
      {
        path:"/all-products",
        element:<AllProducts></AllProducts>
      }
    ]

  }
])

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

)
