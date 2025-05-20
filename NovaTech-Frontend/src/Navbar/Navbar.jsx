import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import logo from "../assets/Logo/NOVA LOGO.png"

export const Navbar = () => {
    const navigate= useNavigate()
    return (
        <div className="navbar bg-base-100 shadow-sm px-10 z-10 sticky top-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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
               <div className='w-25 cursor-pointer' onClick={()=>navigate('/')} ><img src={logo}  alt="" /></div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1  text-lg font-semibold">
                    <li>


                        <details>
                            <summary>All Products</summary>
                            <ul className="p-2 z-10">
                                <li><Link>PA Amplifier</Link></li>
                                <li><Link>Fashion Speaker</Link></li>
                                <li><Link>Fashion Speaker</Link></li>
                                <li><Link>Fashion Speaker</Link></li>
                                <li><Link>Fashion Speaker</Link></li>
                            </ul>
                        </details>



                    </li>
                    <li><Link>About Us</Link></li>
                    <li><Link>Support</Link></li>
                    <li><Link>Contact Us</Link></li>
                   
                </ul>
            </div>
            <div className="navbar-end">
                <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' className='cursor-pointer' ></FontAwesomeIcon>
            </div>
        </div>
    )
}
