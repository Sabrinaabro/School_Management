import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import PreLoader from './components/PreLoader';
import UpdateForm from './components/UpdateForm';
import { supabase } from '../../backend/client';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loader" element={<PreLoader />} />
      <Route path="/update" element={<UpdateForm />} />
    </Routes>
  );
}

export default App;
