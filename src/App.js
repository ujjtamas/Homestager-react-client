import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import IsAnon from './components/IsAnon';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EditProfile from './pages/EditProfile'
import Homestagers from './pages/Homestagers';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import {Map, GoogleApiWrapper} from 'google-maps-react';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route path="/signupuser" element={ <IsAnon><SignupPage usertype="user"/></IsAnon> } />
        <Route path="/signuphomestager" element={ <IsAnon><SignupPage usertype="homestager"/></IsAnon> } />
        <Route path="/login" element={ <IsAnon><LoginPage /></IsAnon> } />
        {/* <Route path="/editProfile" element={<EditProfile />} /> */}
        <Route path="/editProfile/:userid" element={<EditProfile />} />
        <Route path="/search" element={<Homestagers type="search"/>}/>
        <Route path="/browse" element={<Homestagers type="browse"/>}/>
      </Routes>
    </div>
  );
}

export default App;
