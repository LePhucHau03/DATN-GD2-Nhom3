import React, { useState, useRef, useEffect } from 'react';
import { FaReact, FaHome, FaInfoCircle, FaConciergeBell, FaDollarSign, FaPhoneAlt } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { callLogout } from "../../services/api.js";
import { doLogoutAction } from "../../redux/account/accountSlice.js";
import { RiFolderHistoryFill } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";

const Header = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    const user = useSelector((state) => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.statusCode === 200) {
            dispatch(doLogoutAction());
            navigate('/login');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <nav className="bg-purple-900 border-b-2 border-purple-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                <div className="flex items-center space-x-3">
                    <FaReact className="text-pink-400 text-3xl" />
                    <span className="text-white text-2xl font-semibold">BubblyTea</span>
                </div>
                <div className="flex items-center space-x-4 relative">

                    {isAuthenticated && user ? (
                        <div className="relative inline-block" ref={dropdownRef}>
                            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setOpenDropdown(!openDropdown)}>
                                <span className="text-white">Welcome, {user.name}</span>
                                <IoIosArrowDropdown color="white" />
                            </div>
                            {openDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-purple-700 rounded-lg shadow-lg z-10">
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-white">{user.name}</span>
                                        <span className="block text-sm text-gray-400">{user.email}</span>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-200">
                                        <li
                                            className="px-4 py-2 hover:bg-purple-500 cursor-pointer transition duration-200"
                                            onClick={() => navigate('/edit-profile')}
                                        >
                                            Edit Profile
                                        </li>
                                        {user.role.id === 1 && (
                                            <li
                                                className="px-4 py-2 hover:bg-purple-500 cursor-pointer transition duration-200"
                                                onClick={() => navigate('/admin')}
                                            >
                                                Dashboard
                                            </li>
                                        )}
                                        <li
                                            className="px-4 py-2 hover:bg-purple-500 cursor-pointer transition duration-200"
                                            onClick={handleLogout}
                                        >
                                            Sign Out
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <span className="text-white cursor-pointer hover:text-pink-300" onClick={() => navigate('/login')}>
                            Login
                        </span>
                    )}
                </div>
            </div>
            <div className="bg-purple-700 text-white p-3 flex space-x-8 justify-center">
                <Link to="/" className="flex items-center space-x-2 hover:text-pink-300 transition duration-200">
                    <FaHome /> <span>Home</span>
                </Link>
                {isAuthenticated && user && (
                    <Link to="/cart" className="flex items-center space-x-2 hover:text-pink-300 transition duration-200">
                        <BsCart3 /> <span>Cart</span>
                    </Link>
                )}
                {isAuthenticated && user && (
                    <Link to="/order" className="flex items-center space-x-2 hover:text-pink-300 transition duration-200">
                        <RiFolderHistoryFill /> <span>Your Orders</span>
                    </Link>
                )}
                <Link to="/about" className="flex items-center space-x-2 hover:text-pink-300 transition duration-200">
                    <FaInfoCircle /> <span>About</span>
                </Link>
                <Link to="/contact" className="flex items-center space-x-2 hover:text-pink-300 transition duration-200">
                    <FaPhoneAlt /> <span>Contact</span>
                </Link>
            </div>
        </nav>
    );
};

export default Header;
