import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router'
import { DynamicBanner } from '../../../../../Shared Components/Banner/DynamicBanner'
import { ProductCard } from './ProductCard'
import { urlReverter } from '../../../../../Functions/functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
export const Category = ({ url }) => {
  const { categoryName } = useParams()
  const [filterProducts, setFilterProducts] = useState(null)
  const category = urlReverter(categoryName)
  const [search, setSearch] = useState('')
  const [categoryItem,setCategoryItem]=useState(null)
  const [randomItem,setRandomItem]=useState(null)
  const categories=useOutletContext().categories
  const products = useOutletContext().products


  useEffect(() => {
    if (products) {
      const filter_products = products.filter((item) => item?.category?.toLowerCase().includes(category?.toLowerCase()))
      setFilterProducts(filter_products)
      const index=Math.floor(Math.random()*(filter_products.length-1 - 0 + 1 )+0)
      setRandomItem(filter_products[index])
      const filterCategoryItem=categories.find((item)=>item.name.toLowerCase()==category.toLowerCase())
      setCategoryItem(filterCategoryItem)
    }

  }, [products,categoryName])

  const filtered_products = filterProducts && filterProducts.filter((item) => item.model.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className='max-w-[1440px] mx-auto space-y-5'>

      <DynamicBanner item={categoryItem}  ></DynamicBanner>

      <section className='mx-auto my-5'>
        <div className='w-full h-[50px] bg-gray-100 rounded-lg flex items-center justify-center md:my-10'>
          <div className='w-3/4 relative md:w-2/5'>
            <div className='px-2 rounded-sm border-1 border-gray-500 flex items-center'>
              <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' ></FontAwesomeIcon>
              <input type="text" name="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Product' className='p-2 w-full focus:outline-none' id="" />

            </div>

          </div>

        </div>
        <section className='flex justify-center items-center'>
          <div className='grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-3'>
            {/* ____here products details will be provided instead of url____ */}

            {
              filterProducts ?

                filtered_products && filtered_products.map((item, index) => (
                  <ProductCard key={index} item={item} ></ProductCard>
                ))

                :

                [1, 2, 3, 4, 5, 6].map((item, index) =>
                (
                  <div key={index} className="skeleton h-[250px] w-[350px]"></div>
                ))






            }


          </div>
        </section>

      </section>









    </div>
  )
}
