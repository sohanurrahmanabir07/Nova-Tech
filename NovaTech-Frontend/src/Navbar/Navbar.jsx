import { faComment, faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
// import logo from "../assets/Logo/NOVA LOGO.png";
import { capitalizeWords, urlConverter } from '../Functions/functions';
import { useDispatch, useSelector } from 'react-redux';
import { SideNavbar } from './SideNav/SideNavbar';
import { removeUser } from '../State Management/NovaStore';

export const Navbar = ({ products, categories }) => {
    const navigate = useNavigate();
    const detailsRef = useRef(null);
    const user = useSelector((state) => state.NovaTech.users)
    const logo = useSelector((state) => state.NovaTech.logo)
    const dispatch=useDispatch()
    const location = useLocation()

    const isDashboard = location.pathname.startsWith('/dashboard')

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                detailsRef.current.removeAttribute("open");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar bg-base-100 shadow-sm px-10 z-10 sticky top-0">
            <div className="navbar-start space-x-4">
                <div className="dropdown">
                    <label htmlFor="navbar-drawer" className="drawer-button lg:hidden">
                        ☰
                    </label>

                </div>

                <div className='w-25 cursor-pointer block ' onClick={() => navigate('/')}>

                    {logo ?
                        (
                            <img src={logo[0]} alt="Logo" />
                        ) 
                    :
                    (
                        <div className='skeleton  rounded-sm h-10'>

                        </div>
                    )
                   
                   }

                </div>
            </div>
            <SideNavbar categories={categories} ></SideNavbar>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg font-semibold"

                    onClick={() => {
                        if (detailsRef.current) {
                            detailsRef.current.removeAttribute("open");
                        }
                    }}

                >
                    <li className="relative ">
                        <details ref={detailsRef}>
                            <summary>Categories</summary>
                            <div
                                className='p-4 z-10 text-base absolute   bg-white w-[650px] shadow-2xl shadow-blue-500 rounded-sm left-1/2 right-1/2 transform -translate-x-1/2 space-y-2 '
                            >
                                <div className='flex justify-end  '>
                                    <div className='cursor-pointer hover:scale-105 text-blue-500' onClick={() => navigate('/all-products')}>View All Products</div>
                                </div>


                                <section className=" grid grid-cols-3">
                                    {categories &&
                                        categories.map((item, index) => (
                                            <div key={index} className='overflow-hidden cursor-pointer' onClick={() => navigate(`/category/${urlConverter(item?.name)}`)}>
                                                <img src={item?.imageUrl || `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`} className='w-[200px] rounded-md h-[100px] ' alt="" />
                                                <Link to={`/category/${urlConverter(item?.category)}`}>
                                                    {capitalizeWords(item?.name)}
                                                </Link>
                                            </div>
                                        ))}

                                </section>

                            </div>
                        </details>
                    </li>

                    <li className='group'>


                        <div className='group relative'><Link>About</Link></div>

                        <div className='hidden absolute group-hover:block  top-full left-0  shadow-lg shadow-blue-500  bg-white w-[200px]' >
                            <p className='hover:bg-gray-200 p-3' onClick={() => navigate('/profile')}   > <FontAwesomeIcon icon={faHome} size='sm' ></FontAwesomeIcon>  Profile</p>
                            <p className='hover:bg-gray-200 p-3' onClick={() => navigate('/faq')}> <FontAwesomeIcon icon={faComment} size='sm'  ></FontAwesomeIcon>  FAQ</p>

                        </div>



                    </li>
                    <li><Link to={"/support"}>Support</Link></li>
                    <li><Link to={"/contact"} >Contact Us</Link></li>
                    {
                        user && (<li><Link to={"/dashboard"} >Dashboard</Link></li>)
                    }
                </ul >
            </div >

            <div className="navbar-end space-x-5" >
                <FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => { navigate('/all-products'); }} size='md' className='cursor-pointer' />
                    {
                        user && (  <button className="btn btn-soft btn-secondary" onClick={()=>dispatch(removeUser())} >Logout</button> )
                    }
                {isDashboard && (
                    <label
                        htmlFor="dashboard-drawer"
                        className="drawer-button lg:hidden"
                    >
                        ☰
                    </label>
                )}
            </div>
        </div >
    );
};
