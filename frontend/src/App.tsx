import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Account from './pages/account';

import { UserProvider } from './context/userContext';
import axios from 'axios';
import ListingPage from './pages/listingPage';
import AddListingPage from './pages/addListingPage';
import HomeWrapper from './pages/homeWrapper';
import ChatPage from './pages/chat';
import { useAuthStore } from './store/useAuthStore';


axios.defaults.baseURL = '/api/';
axios.defaults.withCredentials = true;

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomeWrapper />}>
          <Route path="home" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="listing" element={<ListingPage />} />
          <Route path="addlisting" element={<AddListingPage />} />
          <Route path="messages" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;