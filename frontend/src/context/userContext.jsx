import { axiosInstance } from "../lib/axios.js";
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axiosInstance.get('/auth/account');
        if (data.error) {
          setUser(null);
        } else {
          setUser(data);
        }
      } catch (error) {
        setUser(null);
      }
    };

    if (!user) {
      console.log('Checking user auth');
      checkAuth();
    } else {
      console.log('User already authenticated');
    }
  }, [user]);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const { data } = await axiosInstance.get('/auth/logout');
        if (data.success) {
          setUser(null);
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('logout', handleLogout);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
