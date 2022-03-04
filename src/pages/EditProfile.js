
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/auth.context';
import {Image} from 'cloudinary-react';
import { isDisabled } from "@testing-library/user-event/dist/utils";

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/homestager-react/image/upload';
const API_URL = "http://localhost:5005";

function EditProfile(props) {
    
    const [imageSelected,setImageSelected] = useState(null);
    const [response, setResponse] = useState(null);
    const [url,setUrl] = useState(null);
    const [allImages, setAllImages] = useState([]);
    const [isHomestager, setIsHomestager] = useState(false);
    const { isLoggedIn, user } = useContext(AuthContext);
    const navigate = useNavigate();
//, {headers: { "X-Requested-With": "XMLHttpRequest" }}
    
    const uploadImage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',imageSelected);
        formData.append('upload_preset','zq7kec5b');
        
        axios
            .post(cloudinaryUrl,formData)
            .then((response) => {setResponse(response);setUrl(response.data.url);console.log('uploaded to Cloudinary')})
            .catch((err) => console.log(err));
    }
    //upload portfolio
    useEffect(() => {
        if(url){
            axios
                .post(`${API_URL}/user/upload`,{url, id: user._id})
                .then((response) => {
                    navigate('/editProfile');
                    console.log('uploaded to mongo' + response.status);
                    setUrl(null);
                })
                .catch((err) => console.log(err));
        }
    },[url]);

    //get user details
     useEffect(() => {
        axios
            .get(`${API_URL}/user/profile/${user._id}`)
            .then((response) =>{
                console.log('get request for user' + JSON.stringify(response.data));
                setIsHomestager(response.data.isHomestager);
                setAllImages(response.data.portfolio);
            })
    },[]);
    console.log(allImages);
    //response.data.url
    return(
        <div>
            <h1>Edit Profile</h1>

            {isHomestager &&
            <form onSubmit={uploadImage}>
                <label htmlFor="file">File:</label>
                <input
                onChange={(e) => {setImageSelected(e.target.files[0])}}
                type="file"
                name="file"
                />
            {/* <button onClick={uploadImage}>Upload Image</button> */}
                <button type="submit">Upload Image</button>
            </form>}

            {isHomestager &&
                <div className="portfolio">
                    {allImages.map((img)=>
                        
                            <Image
                            className="onePicture"
                            cloudName='homestager-react'
                            publicId={img} />
                        
                    )}
                </div>
            }
            {/* <Image 
                cloudName='homestager-react'
                publicId={response.data.url}
            /> */}
        </div>
    )
}

export default EditProfile;