
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/auth.context';
import {Image} from 'cloudinary-react';
import { isDisabled } from "@testing-library/user-event/dist/utils";
import {Map, GoogleApiWrapper} from 'google-maps-react';
import GoogleMap from "../components/GoogleMap";

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/homestager-react/image/upload';
const API_URL = "http://localhost:5005";

function EditProfile(props) {
    
    const [imageSelected,setImageSelected] = useState(null);
    const [response, setResponse] = useState(null);
    const [url,setUrl] = useState(null);
    const [allImages, setAllImages] = useState([]);
    const [isHomestager, setIsHomestager] = useState(false);
    const { isLoggedIn, user } = useContext(AuthContext);
    const [userName, setUserName] = useState(user.name);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState([]);
    const [messageResponse, setMessageResponse] = useState();
    const navigate = useNavigate();
    
    const changeUser = (e) => {
        e.preventDefault();
        const newName = e.target.name.value;

        axios
            .post(`${API_URL}/user/profile/`,{name: newName, id: user._id})
            .then((response) => {
                // console.log(response)
            })
            .catch((err) => console.log(err))
    };

    //Delete image to be added
    const deleteImage= (e) => {
        const imgToDelete = e.target.id;
    };

    //upload new image
    const uploadImage = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file',imageSelected);
        formData.append('upload_preset','zq7kec5b');
        
        axios
            .post(cloudinaryUrl,formData)
            .then((response) => {
                setResponse(response);
                setUrl(response.data.url);
                // console.log('uploaded to Cloudinary');
                let fileUpload = document.getElementById('fileUpload');
                fileUpload.value='';
            })
            .catch((err) => console.log(err));
        
    }

    const Respond = (e) => {
        e.preventDefault();
        const element = e.target.response
        const response = e.target.response.value;
        const sender = element.getAttribute('from');
        const receiver = element.getAttribute('to');
        const originalMessage = e.target.response.id

        const requestBody = {sender: sender, receiver: receiver, message: response, id: originalMessage, isResponse: true};
        
        axios
            .post(`${API_URL}/message/send`,requestBody)
            .then((response) => {
                if(response.status === 200){
                    //setMessageResponse('');
                    //remove answered message
                    message.map((element,index)=>{
                        if(originalMessage === element._id)
                            {
                                message.splice(index,1);
                                setShowMessage(false);
                            }
                    })
                    setShowMessage(true);
                }
            })
            .catch((err) => console.log(err));
            console.log(message);

    }
    //upload portfolio
    useEffect(() => {
        if(url){
            axios
                .post(`${API_URL}/user/upload`,{url, id: user._id})
                .then((response) => {
                    navigate('/editProfile/'+user._id);
                    // console.log('uploaded to mongo ' + response.status);
                    setUrl(null);
                })
                .catch((err) => console.log(err));
        }
    },[url]);

    //get user details
     useEffect(() => {
         //getuser profile
        axios
            .get(`${API_URL}/user/profile/${user._id}`)
            .then((response) =>{
                // console.log('get request for user ' + JSON.stringify(response.data));
                setIsHomestager(response.data.isHomestager);
                setAllImages(response.data.portfolio);
            })
        //get messages
        axios
            .get(`${API_URL}/message/get/${user._id}`)
            .then((response) =>{
                const messages = response.data;
                if(messages.length > 0){
                    setShowMessage(true);
                    setMessage(messages);
                    setMessageResponse();
                }
            })

    },[]);

    //get pictures when new added
    useEffect(() => {
        axios
            .get(`${API_URL}/user/profile/${user._id}`)
            .then((response) =>{
                // console.log('get request for user ' + JSON.stringify(response.data));
                setIsHomestager(response.data.isHomestager);
                setAllImages(response.data.portfolio);
            })
    },[url]);
    //response.data.url
    return(
        <div>
            <h1>Edit Profile</h1>
            {
            <form onSubmit={changeUser}>
                <label htmlFor="name">Name: 
                    <input 
                        name="name"
                        id="name"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <button type="submit">Change</button>
            </form>
            }
            <GoogleMap />
            {showMessage && 
                <div className="container">
                    {
                        message.map((oneMessage) => 
                            <form className="message" onSubmit={Respond}>
                            <p>From {oneMessage.sender.email}</p>
                            <p>Message: {oneMessage.message}</p>
                            <input
                                type="text"
                                id={oneMessage._id}
                                name="response"
                                from={user._id}
                                to={oneMessage.sender._id}
                                value={messageResponse}
                                onChange={(e) => setMessageResponse(e.target.value)}
                            />
                            <button id={oneMessage._id} type="submit" className="btn">Respond</button>
                            </form>
                        )
                    }
                </div>
            }
            
            {isHomestager &&
            <form onSubmit={uploadImage}>
                <label htmlFor="file">File:</label>
                <input
                id="fileUpload"
                onChange={(e) => {setImageSelected(e.target.files[0]);}}
                type="file"
                name="file"
                />
            {/* <button onClick={uploadImage}>Upload Image</button> */}
                
                <button type="submit">Upload Image</button>
            </form>}

            {isHomestager &&
                <div className="portfolio">
                    {allImages.map((img)=>
                        <div>
                            <Image
                            className="onePicture"
                            cloudName='homestager-react'
                            publicId={img} />
                            <button id={img} onClick={deleteImage}>Delete</button>
                        </div>
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