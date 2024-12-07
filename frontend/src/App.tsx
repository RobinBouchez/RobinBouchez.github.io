import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Account from './pages/account';

import { UserProvider } from './context/userContext';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;



function App() {
  return (
    <UserProvider>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/home" element={<Home />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/register" element={<RegisterPage />} />
       <Route path="/account" element={<Account />} />
    </Routes>
    </UserProvider>
  );
}

export default App;