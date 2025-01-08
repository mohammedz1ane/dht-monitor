// src/components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaSun, FaMoon, FaSignOutAlt, FaExclamationTriangle, FaHome } from 'react-icons/fa';
import BlurText from './BlurText';
import { Menu } from '@headlessui/react';
import {  Bars3Icon } from '@heroicons/react/24/solid';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout, theme, toggleTheme}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
   const navigate = useNavigate();
    const location = useLocation();
   const toggleMenu = () => {
         setIsMenuOpen(!isMenuOpen)
    };

    const closeMenu = () => {
         setIsMenuOpen(false)
   }

   useEffect(() => {
        const handleOutsideClick = (e) => {
            if(menuRef.current && !menuRef.current.contains(e.target)){
                closeMenu();
           }
       };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
  }, []);
     const toggleIncidentsView = () => {
        setIsMenuOpen(false);
          navigate(location.pathname === '/incidents' ? '/' : '/incidents');
    };


    return (
        <header className="app-header flex justify-between items-center">
             <Link to="/" className="ml-5">
                 <BlurText
                      text="IOT_Project   Dashboard"
                      delay={100}
                       animateBy="words"
                        direction="bottom"
                      className="text-2xl font-bold"
                       key={isMenuOpen}
                  />
            </Link>
             <div className="relative flex items-center space-x-4 mr-5" ref={menuRef}>
                <button onClick={toggleMenu} className="dark:text-white light:text-gray-800 text-lg focus:outline-none">
                   <Bars3Icon className="h-6 w-6"/>
                 </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-10">
                           <button onClick={toggleTheme} className='block w-full text-left px-2 py-2  dark:text-white light:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors' >
                                 {theme === 'dark' ? <FaSun/> : <FaMoon />} {theme === 'dark' ? 'Light Mode' : 'Dark Mode' }
                           </button>
                           {isLoggedIn && (
                                <button onClick={onLogout} className="block w-full text-left px-2 py-2 dark:text-white light:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                   <FaSignOutAlt/> Logout
                               </button>
                        )}
                         <button onClick={toggleIncidentsView} className="block w-full text-left px-2 py-2 dark:text-white light:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                             {location.pathname === '/incidents' ?  <FaHome /> : <FaExclamationTriangle />}  {location.pathname === '/incidents' ? 'View Home' : 'View Incidents'}
                           </button>
                      </div>
                   )}
              </div>
         </header>
    );
};

export default Header;