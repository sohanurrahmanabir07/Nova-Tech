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
import { Login } from './Login-Register/Login.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './State Management/store.js'
import { Provider } from 'react-redux'
import { Dashboard } from './Dashboard/Dashboard.jsx'


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
        path: "/all-products",
        element: <AllProducts></AllProducts>
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children:[
          {
            path:"/dashboard/products",
            element:<AllProducts></AllProducts>
          }
        ]
      }

    ],

  },
  {
    path: "/admin-login",
    element: <Login></Login>
  }

])

createRoot(document.getElementById('root')).render(


  <Provider store={store}>

    <PersistGate loading={<p>Loading From Redux.....</p>} persistor={persistor} >


      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
