// src/pages/LoginPage.js

import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');                             // <== ADD      
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit} className="form-horizontal">
        <div className="form-group">
          <label>Email: 
            <input 
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              className="form-control"
            />
          </label>
        </div>

        <div className="form-group">
          <label>Password: 
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              className="form-control"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary top-margin2">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
    </div>
  )
}

export default LoginPage;