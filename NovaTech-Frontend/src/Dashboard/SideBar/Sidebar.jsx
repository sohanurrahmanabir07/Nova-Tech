import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink, useNavigate } from 'react-router'

export const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <div className="drawer lg:drawer-open z-20 md:z-0 w-auto sticky">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-blue-500 space-y-5  text-center font-semibold text-gray-200 min-h-full md:text-lg p-4">
                    {/* Sidebar content here */}

                    <div className='flex flex-row-reverse  md:hidden'>
                        <div>
                            <label
                                htmlFor="dashboard-drawer"
                                className="drawer-button "
                            >
                                <FontAwesomeIcon icon={faXmark} size='lg' ></FontAwesomeIcon>
                            </label>
                        </div>
                    </div>
                    <NavLink className={({ isActive }) => isActive ? "bg-blue-400 text-white px-3 py-2 font-bold rounded-md" : 'hover:bg-blue-300'}  to={"/dashboard"}><li>Home</li></NavLink>
                    
                    <NavLink to={'/dashboard/categories'} className={({ isActive }) => isActive ? "bg-blue-400 text-white px-3 py-2 font-bold rounded-md" : 'hover:bg-blue-300'}><li>Categories</li>
                    </NavLink>

                    <NavLink className={({ isActive }) => isActive ? "bg-blue-400 text-white px-3 py-2 font-bold rounded-md" : 'hover:to-blue-300'} ><li>Admin's</li></NavLink>
                    
                    
                    <NavLink className={({ isActive }) =>
                        isActive ? "bg-blue-400 text-white px-3 py-2 font-bold rounded-md" : " hover:bg-blue-300"
                    }><li>Requested</li></NavLink>
                    
                    
                    <NavLink className={({ isActive }) =>
                        isActive ? "bg-blue-400 text-white px-3 py-2 font-bold rounded-md" : " hover:bg-blue-300"
                    }
                        to={'/dashboard/products'}><li>Products</li>
                    </NavLink>
                </ul>
            </div>
        </div>

    )
}
