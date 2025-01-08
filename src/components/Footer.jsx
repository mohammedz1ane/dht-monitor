// src/components/Footer.jsx
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="app-footer p-4 text-center mt-8">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <p className="text-sm dark:text-gray-300 light:text-gray-600">
                    © {new Date().getFullYear()} DHT Sensor Monitoring. All rights reserved.
                </p>
                <div className="flex gap-5 items-center ">
                        <a href="https://github.com/mohammedz1ane" target="_blank" rel="noopener noreferrer" className="dark:text-gray-300 light:text-gray-600 hover:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200">
                             <FaGithub size={24}/>
                        </a>
                    <a href="mailto:mohammedz1ane@outlook.com" className="text-sm  dark:text-gray-300 light:text-gray-600 hover:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200">
                         Contact Dev Team
                     </a>
                </div>
           </div>
        </footer>
    );
};

export default Footer;