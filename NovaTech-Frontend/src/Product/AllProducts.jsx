import React, { useContext, useEffect, useState } from 'react'
import Cover from "../assets/files/banner/cover.jpg"
import { ProductCard } from '../Home/Component/HeroSection/Category/Product_Category/ProductCard'
import Amplifier from "../assets/files/PA Images/NT-40WPA/34.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useOutletContext } from 'react-router'
import { capitalizeWords } from '../Functions/functions'
export const AllProducts = () => {
    const [limit, setLimit] = useState(5)
    const { products, categories } = useOutletContext()
    const [categoryFilter, setCategoryFilter] = useState([])
    const [filterProducts, setFilterProducts] = useState([])
    const [search, setSearch] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const location=useLocation()
    useEffect(() => {
        if (products != null) {
            setFilterProducts(products); // Load products into filterProducts when available
        }
    }, [products]);


    useEffect(() => {

        if (products) {
            const filter = products.filter((item) => {
                const searchLower = search.toLowerCase();

                // Define the keys to search in from the category
                const searchableKeys = ["model", "category", "release_date", "name", "rating"];

                // Check if any of the fields contain the search term
                return searchableKeys.some(key =>
                    item[key] && item[key].toString().toLowerCase().includes(searchLower)
                );
            });
            setFilterProducts(filter)
        }

    }, [search])

    useEffect(() => {
        if (products) {
            const filter = categoryFilter.length > 0 ?
                products.filter((item => categoryFilter.includes(item?.category.toLowerCase())))
                :
                products

            setFilterProducts(filter)

        }
    }, [categoryFilter])

    const handleCheck = (e) => {
        e.target.checked ? setCategoryFilter((prev) => [...prev, e.target.value]) : setCategoryFilter((prev) => [...prev].filter((item) => item != e.target.value))


    }

    return (
        <div className={`max-w-[1440px] ${!location.pathname.startsWith('/dashboard') && 'mx-auto' } space-y-5 mb-20`}>

            <div className='md:h-[400px] bg-amber-200 overflow-hidden md:rounded-lg'>
                <img src={Cover} className=' md:w-full' alt="" />
            </div>


            <div className='w-full h-[50px] bg-gray-100 rounded-lg flex items-center justify-center md:my-10'>
                <div className='w-3/4 relative md:w-2/5'>
                    <div className='px-2 rounded-sm border-1 border-gray-500 flex items-center'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' ></FontAwesomeIcon>
                        <input type="text" name="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Product' className='p-2 w-full focus:outline-none' id="" />

                    </div>

                </div>

            </div>


            <section className='flex justify-center max-sm:flex-col max-sm:space-y-3 space-x-3  '>
                <div className='max-sm:hidden'>
                    <section className='bg-gray-200 w-[220px] space-y-3 p-4 rounded-lg shadow-lg '>

                        {
                            categories && categories.map((item, index) =>
                            (
                                <div className='flex justify-between cursor-pointer'>

                                    <label className='font-semibold text-base'>{capitalizeWords(item?.name)}</label>
                                    <input type="checkbox" value={item?.name.toLowerCase()} onChange={handleCheck} className='toggle toggle-sm' />
                                </div>
                            ))
                        }
                        <div className='flex justify-between items-center cursor-pointer'>

                            <label className='font-semibold text-base'>PA Amplifier</label>
                            <input type="checkbox" id="pa-amplifier" value="pa amplifier" onChange={handleCheck} className='toggle toggle-sm' />
                        </div>

                    </section>
                </div>





                <section className='space-y-2  max-sm:mx-auto w-4/5'>
                    <div className='flex flex-row-reverse md:hidden'  >
                        <div>
                            <div onClick={() => setShowFilter(!showFilter)} className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn m-1 w-[150px] rounded-sm">Filter <FontAwesomeIcon icon={faFilter} ></FontAwesomeIcon></div>

                            </div>
                        </div>


                    </div>
                    {
                        showFilter &&
                        (
                            <section className={`bg-gray-200 w-[220px]  transition-all duration-300 ease-in-out transform md:hidden mx-auto space-y-3 p-4 rounded-lg shadow-lg md:mt-15   ${showFilter ? `opacity-100 scale-100` : `opacity-0 scale-95 hidden`}`}>
                                {
                                    categories && categories.map((item, index) =>
                                    (
                                        <div className='flex justify-between cursor-pointer'>

                                            <label className='font-semibold text-base'>{capitalizeWords(item?.name)}</label>
                                            <input type="checkbox" value={item?.name} onChange={handleCheck} className='toggle toggle-sm' />
                                        </div>
                                    ))
                                }
                            </section>
                        )
                    }



                    {
                        products ?



                            filterProducts.length > 0 ?

                                (<div className='grid grid-cols-1 md:grid-cols-3  md:gap-1 gap-3'>



                                    {filterProducts.slice(0, limit).map((item, index) => {
                                        return (
                                      
                                                <ProductCard key={index} item={item} ></ProductCard>
                                          
                                        )
                                    })
                                    }
                                </div>
                                )
                                :
                                (
                                    <div className='h-screen'>
                                        <p className='font-bold text-center text-2xl mt-20'>No Product Available...</p>
                                    </div>


                                )






                            :

                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) =>
                            (
                                <div key={index} className="skeleton h-[250px] w-[350px]"></div>
                            ))



                    }




                </section>

            </section>




        </div>
    )
}




