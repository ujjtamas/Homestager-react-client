import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/auth.context';
import {Map, GoogleApiWrapper} from 'google-maps-react';

function GoogleMap(){
    const [src,setSrc] = useState('');
    const [isEditProfile, SetIsEditProfile] = useState('');
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    
    useEffect(() => {
        const path = window.location.href;
        const isEditProfile = path.indexOf('editProfile') > -1;
        SetIsEditProfile(isEditProfile);
    },[])
    
    navigator.geolocation.getCurrentPosition((loc) => {
        const originLat = loc.coords.latitude;
        const originLon = loc.coords.longitude;
        const destinationLat = 48;
        const destinationLon = 22;
        //const src= "https://www.google.com/maps/embed/v1/place?key=AIzaSyBzsRtSWl4su2hGhKgQp2kRncOiKTEe7A0&q=Space+Needle,Nyíregyháza+Korzó"
        if(isEditProfile){
            setSrc("https://www.google.com/maps/embed/v1/place?key=AIzaSyBzsRtSWl4su2hGhKgQp2kRncOiKTEe7A0&q=Space+Needle,Nyíregyháza+Korzó");
        }
        if(!isEditProfile){
            setSrc("https://www.google.com/maps/embed/v1/directions?key=AIzaSyBzsRtSWl4su2hGhKgQp2kRncOiKTEe7A0&origin=" + originLat + ',' + originLon + '&destination=' + destinationLat + ',' + destinationLon)
        }
    })

    return(
        <div>
            <iframe
                width= "400"
                height= "300"
                frameborder="0"
                src={src}>
            </iframe>
        </div>
    )
}

export default GoogleMap;