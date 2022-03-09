import react from 'react';
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/auth.context';
import {Image} from 'cloudinary-react';

//const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/homestager-react/image/upload';
const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_URL;
const API_URL = process.env.REACT_APP_API_URL;

function Homestagers(props){
    const [isHomestager, setIsHomestager] = useState(false);
    const [homestagers,setHomestagers] = useState([]);
    const [homestager, setHomestager] = useState(null);
    const [homestagerUserID, setHomestagerUserID] = useState(null);
    const [userID, setUserID] = useState(null);
    const [allImages, setAllImages] = useState([])
    const [isBrowse, setIsBrowse] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [message,setMessage] = useState('');

    const { isLoggedIn, user } = useContext(AuthContext);

    const { type } = props;

    useEffect(() => {
        if(isBrowse){
            axios
            .get(`${API_URL}/user/homestagers/`)
            .then((response) =>{
            // console.log('get request for user ' + JSON.stringify(response.data));
            
            const homestagersArray = response.data.homestagers;
            const arr = [];
            homestagersArray.map((oneHomestager) => {
                arr.push(...oneHomestager.portfolio);
            })
            setAllImages(arr);
        })
        }
    },[isBrowse]);

    //Initial load of all homestager
    useEffect(() => {
        if(type === 'browse') {setIsBrowse(true)}
        if(type === 'search') {setIsBrowse(false)}
        getMessages();

        async function getHomestager(){
        let p = axios
            .get(`${API_URL}/user/homestagers`)
            .then((response) =>{
                setHomestagers(response.data.homestagers)
            })
            .catch((err) => console.log(err));
            return p;
        }

        async function getMessages(){
            let hs = await getHomestager();
            let p = await axios
                .get(`${API_URL}/message/get`)
                .then((response) =>{
                    console.log(response)
                })
                .catch((err) => console.log(err));
            return p
            }
    }
    ,[]);

    //get profile for selected homestager
    useEffect(() => {
        // getProfile(); 
        axios
            .get(`${API_URL}/user/profile/${homestagerUserID}`)
            .then((response) =>{
                // console.log('get request for user ' + JSON.stringify(response.data));
                setAllImages(response.data.portfolio);
            })
            .catch((err) => console.log(err));
    },[homestager])

    useEffect(() => {
        console.log(homestager)
    },[showContact])

    //Set the selected homestager 
    const showProfile = (e) => {
        setHomestager(e.target.id);
        setUserID(e.target.name);
        setHomestagerUserID(e.target.name);
        setShowContact(true);
    }

    const contactUser = (e) => {
        setShowContact(false);
        setShowContact(true);
    }

    const handleMessage = (e) => setMessage(e.target.value);

    const sendMessage = (e) => {
        e.preventDefault();

        /* console.log('homestager user ID: ' + homestagerUserID);
        console.log('Homestager id: ' + homestager);
        console.log('current user: ' + JSON.stringify(user)); */

        const conversationid = user._id + '-' + homestagerUserID
        const requestBody = { message, sender: user._id, receiver: homestagerUserID, answered: false };
        
        // console.log(requestBody);

        axios
            .post(`${API_URL}/message/send`,requestBody)
            .then((response) => {
                if(response.status === 200){
                    setMessage('');
                }
            })
            .catch((err) => {console.log(err)})
    }

    return(
    <div>
        <h3>Homestagers</h3>
        {homestagers && !isBrowse &&
            <div id="homestagers">
            <p>Portfolio</p>
                {homestagers.map((oneHomestager) =>
                    <div>
                    <button id={oneHomestager._id} name={oneHomestager.user._id} onClick={showProfile}>{oneHomestager.user.name}</button>
                    </div>
                )}
            </div>
        }
            
       {/*  {homestager &&
            <button id={homestager} name={homestager} onClick={contactUser}>Contact</button>
        } */}

        {showContact &&
            <div>
                <form onSubmit={sendMessage}>
                    <label htmlFor='message'>Message: 
                        <input 
                            type="text"
                            name="message"
                            height="20"
                            value={message}
                            onChange={handleMessage}
                        />
                    </label>
                    <button type="submit" >Send</button>
                </form>
            </div>
        }

        {allImages && !isBrowse &&
            <div>
            
                {allImages.map((img)=>
                    <div>
                        <Image
                        className="onePicture"
                        cloudName='homestager-react'
                        id={img}
                        publicId={img} />
                    </div>
                )}
            </div>
        }

        {isBrowse && allImages &&
            <div>
            {homestager}
                {allImages.map((image) => 
                    <div>
                    <Image
                    className="onePicture"
                    cloudName='homestager-react'
                    publicId={image} />
                    </div>
                )}
            </div>
        }

        
    </div>
    )
}

export default Homestagers;