import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Account from './pages/account';
import SearchResult from  './pages/searchResult';

import { UserProvider } from './context/userContext';
import axios from 'axios';
import ListingPage from './pages/listingPage';
import AddListingPage from './pages/addListingPage';
import HomeWrapper from './pages/homeWrapper';
import ChatPage from './pages/chat';
import { useAuthStore } from './store/useAuthStore';
import Blog from './pages/blog';
import BlogDetails from './pages/blogDetails';
import FAQ from './pages/faq';


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
        <Route path="https://switcharoom.social/" element={<HomeWrapper />}>
          <Route path="https://switcharoom.social/home" element={<Home />} />
          <Route path="https://switcharoom.social/account" element={<Account />} />
          <Route path="https://switcharoom.social/listing" element={<ListingPage />} />
          <Route path="https://switcharoom.social/addlisting" element={<AddListingPage />} />
          <Route path="https://switcharoom.social/messages" element={<ChatPage />} />
          <Route path="https://switcharoom.social/blog" element={<Blog />} />
          <Route path="https://switcharoom.social/blog/:id" element={<BlogDetails />} />
		    <Route path="https://switcharoom.social/searchResult" element={<SearchResult />} />
        <Route path="https://switcharoom.social/FAQ" element={<FAQ />} />
        </Route>
        <Route path="https://switcharoom.social/login" element={<LoginPage />} />
        <Route path="https://switcharoom.social/register" element={<RegisterPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;