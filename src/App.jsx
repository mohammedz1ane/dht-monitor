// src/App.jsx
import { useState, useEffect } from 'react';
import useFetchData from './hooks/useFetchData';
import DataTable from './components/DataTable';
import './styles/index.css';
import DataDisplay from './components/DataDisplay';
import Header from './components/Header';
import CombinedChart from './components/CombinedChart';
import Login from './components/Login';
import Footer from './components/Footer';
import Incidents from './components/Incidents';
import { Route, Routes, useLocation} from 'react-router-dom';

const App = () => {
   const apiUrl = '/api/post/';
    const { data, loading, error } = useFetchData(apiUrl);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [showIncidents, setShowIncidents] = useState(false);
     const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true')
       {
          setIsLoggedIn(true);
        }
    }, []);

     useEffect(() => {
         localStorage.setItem('theme', theme);
         document.documentElement.classList.toggle('dark', theme === 'dark');
       document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

    useEffect(() => {
         if (location.pathname === '/incidents') {
            setShowIncidents(true);
        } else {
          setShowIncidents(false);
       }
  }, [location]);


   const handleLogin = () => {
         setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
   };
    const handleLogout = () => {
       setIsLoggedIn(false);
       localStorage.removeItem('isLoggedIn');
      setShowIncidents(false);
   };
   const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    const toggleIncidentsView = () => {
       setShowIncidents(!showIncidents);
   };

    if (loading) {
        return <p>Loading data...</p>;
    }

    if (error) {
       return <p>Error: {error.message}</p>;
   }

   if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
   }

    return (
            <div className={`${theme} dark:bg-dark-bg light:bg-light-bg min-h-screen`}>
                  <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme}  toggleIncidentsView={toggleIncidentsView} showIncidents={showIncidents}/>
                  <Routes>
                       <Route path="/" element={<div className="container">
                                                      <DataDisplay data={data} />
                                                      <div className="chart-container">
                                                          <CombinedChart data={data} />
                                                       </div>
                                                      <DataTable data={data} />
                                                  </div>} />
                       <Route path="/incidents" element={<Incidents data={data} />} />
                 </Routes>
                 <Footer/>
         </div>
  );
};

export default App;