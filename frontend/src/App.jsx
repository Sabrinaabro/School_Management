import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PreLoader from './components/PreLoader';
import Clerk from './pages/Clerk';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 

    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    
    return <PreLoader />;
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clerk" element={<Clerk />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
