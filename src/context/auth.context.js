// src/context/auth.context.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {       //  <==  ADD
    localStorage.setItem('authToken', token);
  }
  
  const authenticateUser = () => {           //  <==  ADD  
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios.get(
        `${API_URL}/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        // If the server verifies that JWT token is valid  
        const user = response.data;
        
       // Update state variables        
        
        setIsLoading(false);
        setUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      });
    } else {
      // If the token is not available (or is removed)
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
    }   
  }
 
  
  
  const verifyStoredToken = () => { 
    // ... no changes      
  }
  
  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }
 
  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();
  } 

  useEffect(() => {
    authenticateUser();
    verifyStoredToken();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };