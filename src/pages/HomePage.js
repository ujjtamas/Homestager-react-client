import react from 'react';

function HomePage() {

    return(
        <div>
            <h1>HomePage</h1>
            <div id="searchHomestager" className="box">
                <a href="/search" className='link'><p>Search Homestager</p></a>
            </div>
            <div id="browsePicture" className="box">
                <p>Browse picture</p>
            </div>

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