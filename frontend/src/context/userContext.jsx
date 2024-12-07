import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get('/account').then(({ data }) => {
        if (data.error) {
          console.error('Failed to fetch user:', data.error);
          setUser(null);
          return;
        }
        setUser(data);
      })
      .catch((error) => {
        console.error('Failed to fetch user:', error);
        setUser(null);
      })
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
