import React from 'react'
import { useNavigate } from 'react-router'

export const Sidebar = () => {
    const navigate=useNavigate()
    return (
        <div className="drawer lg:drawer-open z-20 md:z-0 w-auto sticky">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-blue-500 font-semibold text-gray-200 min-h-full md:text-lg p-4">
                    {/* Sidebar content here */}

                    <div className='flex flex-row-reverse  md:hidden'>
                        <div>
                            <label
                                htmlFor="dashboard-drawer"
                                className="btn btn-primary drawer-button "
                            >
                                X
                            </label>
                        </div>
                    </div>
                    <li><a>Home</a></li>
                    <li><a>Categories</a></li>
                    <li><a>Admin's</a></li>
                    <li><a>Requested</a></li>
                    <li onClick={()=>navigate('/dashboard/products')}><a>Products</a></li>
                </ul>
            </div>
        </div>

    )
}
