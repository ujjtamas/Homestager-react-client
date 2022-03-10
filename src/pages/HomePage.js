import { useState, useContext, useEffect, react } from "react";
import { AuthContext } from '../context/auth.context';

function HomePage() {

    const { isLoggedIn, user } = useContext(AuthContext);

    return(
        <div>
            <h1>HomePage</h1>
            {isLoggedIn &&
            <div>
                <div id="searchHomestager" className="box">
                    <a href="/search" className='link'><p>Search Homestager</p></a>
                </div>
                <div id="browsePicture" className="box">
                    <a href="/browse" className='link'><p>Browse picture</p></a>
                </div>
            </div>
            }
            <div id="login" className="box">
                <a href="/login" className='link'> <button className='btn'>Login</button></a>
            </div>

            <div id="signup" className="box">
                <a href="/signupuser" className='link'><button className='btn'>Sign up User</button></a>
            </div>

            <div id="signup" className="box">
                <a href="/signuphomestager" className='link'><button className='btn'>Sign up Hs</button></a>
            </div>
            
        </div>
    )
}

export default HomePage