// src/components/Login.jsx
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';


const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            onLogin();
            setError('');
       } else {
            setError('Invalid username or password');
       }
    };

    return (
         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
             <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 dark:text-white">Admin Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Username</label>
                         <div className="relative">
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-700 dark:text-gray-300'>
                                <FaUser />
                            </div>
                           <input
                               type="text"
                              id="username"
                                value={username}
                                 onChange={e => setUsername(e.target.value)}
                              className="shadow appearance-none border rounded w-full py-2 pl-8 pr-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
                               required
                          />
                       </div>
                   </div>
                   <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password</label>
                       <div className="relative">
                         <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-700 dark:text-gray-300'>
                             <FaLock />
                          </div>
                           <input
                                type="password"
                             id="password"
                               value={password}
                              onChange={e => setPassword(e.target.value)}
                              className="shadow appearance-none border rounded w-full py-2 pl-8 pr-3 text-gray-700 dark:text-gray-300  mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
                               required
                           />
                       </div>
                   </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                </form>
            </div>
         </div>
   );
};

export default Login;