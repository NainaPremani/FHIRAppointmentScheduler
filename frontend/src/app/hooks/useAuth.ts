"use client"
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Logic to check if user is authenticated (like checking token in local storage)
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  return { isAuthenticated };
};

export default useAuth;
