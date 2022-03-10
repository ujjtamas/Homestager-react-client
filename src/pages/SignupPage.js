// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const userType = props.usertype;
  const isHomestager = userType == "homestager" ? true : false;
  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    
    let requestBody = {};
    if(isHomestager) requestBody = { email, password, name, description, isHomestager };
    if(!isHomestager) requestBody = { email, password, name, isHomestager };
 
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>
      {!isHomestager &&
      <form onSubmit={handleSignupSubmit} className="form-horizontal">
      <div className="form-group">
      <label htmlFor="email">Email:
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
        <label htmlFor="password">Password:
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          className="form-control"
        />
        </label>
        </div>

        <div className="form-group">
        <label htmlFor="name">Name:
        <input 
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="form-control"
        />
        </label>
        </div>

        <button type="submit" className="btn btn-primary top-margin2">Sign Up</button>
      </form>
      }

      {isHomestager &&
        <form onSubmit={handleSignupSubmit} enctype="multipart/form-data" className="form-horizontal">
      
        <div className="form-group">
        <label htmlFor="email">Email:
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
        <label htmlFor="password">Password:
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          className="form-control"
        />
        </label>
        </div>
        <div className="form-group">
        <label htmlFor="name">Name:
        <input 
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="form-control"
        />
        </label>
        </div>
        <div className="form-group">
        <label htmlFor="description">Description:
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescription}
          className="form-control"
        />
        </label>
        </div>
        <button type="submit" className="btn btn-primary top-margin2">Sign Up</button>
        </form>          
      }

      { errorMessage && <p className="error-message">{errorMessage}</p> }
      <br />
      <p>Already have account?</p>
      <Link to={"/login"}>
      <button className="btn btn-primary btn-xs">Login</button>
      </Link>
    </div>
  )
}

export default SignupPage;