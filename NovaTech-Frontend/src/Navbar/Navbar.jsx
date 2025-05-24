import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import logo from "../assets/Logo/NOVA LOGO.png";
import { capitalizeWords, urlConverter } from '../Functions/functions';
import { useSelector } from 'react-redux';

export const Navbar = ({ products, categories }) => {
    const navigate = useNavigate();
    const detailsRef = useRef(null);
    const user = useSelector((state) => state.NovaTech.users)

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
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                {isDashboard && (
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-primary drawer-button lg:hidden"
                    >
                        ☰
                    </label>
                )}
                <div className='w-25 cursor-pointer' onClick={() => navigate('/')}>
                    <img src={logo} alt="Logo" />
                </div>
            </div>

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

                    <li><Link>About Us</Link></li>
                    <li><Link>Support</Link></li>
                    <li><Link>Contact Us</Link></li>
                    {
                        user && (<li><Link to={"/dashboard"} >Dashboard</Link></li>)
                    }
                </ul >
            </div >

            <div className="navbar-end" onClick={() => navigate('/all-products')} >
                <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' className='cursor-pointer' />
            </div>
        </div >
    );
};
