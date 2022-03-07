import react from 'react';
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/auth.context';

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/homestager-react/image/upload';
const API_URL = "http://localhost:5005";

function Homestager(props) {
console.log('ev ' + props);
const userid = window.location.href.toString().split('/')[window.location.href.toString().split('/').length-1]

console.log(window.location.href);
console.log(userid);
return(
    <div>
        OneHomestager
    </div>
)
}

export default Homestager