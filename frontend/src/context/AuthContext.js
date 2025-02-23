
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Add token state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token'); // Get token from local storage

    if (storedUser && storedToken) { // Check for both user and token
      try {
        const parsedUser = JSON.parse(storedUser);
        const parsedToken = storedToken; // No need to parse, token is already a string
        setUser(parsedUser);
        setToken(parsedToken);
      } catch (error) {
        console.error("Error parsing user/token from localStorage:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => { 
    setUser(userData);
    setToken(token); 
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token); 
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};