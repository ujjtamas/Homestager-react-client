import react from 'react';
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/auth.context';
import {Image} from 'cloudinary-react';

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/homestager-react/image/upload';
const API_URL = "http://localhost:5005";

function Homestagers(){
    const [isHomestager, setIsHomestager] = useState(false);
    const [homestagers,setHomestagers] = useState([]);
    const [homestager, setHomestager] = useState(null);
    const [userID, setUserID] = useState(null);
    const [allImages, setAllImages] = useState([])

    const { isLoggedIn, user } = useContext(AuthContext);
    
    useEffect(() => {
        console.log(allImages);
     /*    axios
            .get(`${API_URL}/user/profile/${userID}`)
            .then((response) =>{
            // console.log('get request for user ' + JSON.stringify(response.data));
            setAllImages(response.data.portfolio);
        }) */
    },[allImages]);

    //Initial load of all homestager
    useEffect(() => {
        axios
            .get(`${API_URL}/user/homestagers`)
            .then((response) =>{
                console.log(response);
                setHomestagers(response.data.homestagers)
                console.log('e: ' + homestagers);
            })
            .catch((err) => console.log(err));
    }
    ,[]);

    //get profile for selected homestager
    useEffect(() => {
        console.log(homestager)
         axios
            .get(`${API_URL}/user/profile/${userID}`)
            .then((response) =>{
                console.log('get request for user ' + JSON.stringify(response.data));
                setAllImages(response.data.portfolio);
            })
    },[homestager])

    //Set the selected homestager 
    const showProfile = (e)=>{
        setHomestager(e.target.id);
        setUserID(e.target.name);
    }

    return(
    <div>
        <h3>Homestagers</h3>
        {homestagers &&
            <div id="homestagers">
                {homestagers.map((oneHomestager) =>

                    <div>
                    <a href={"/homestager/" + oneHomestager._id}>{oneHomestager.user.name}</a>
                    <button id={oneHomestager._id} name={oneHomestager.user._id} onClick={showProfile}>{oneHomestager.user.name}</button>
                    </div>
                )}
            </div>
        }

        {allImages &&
        <div>
        {allImages.map((img)=>
                        <div>
                            <Image
                            className="onePicture"
                            cloudName='homestager-react'
                            publicId={img} />
                        </div>
                    )}
        </div>

        }
    </div>
    )
}

export default Homestagers;