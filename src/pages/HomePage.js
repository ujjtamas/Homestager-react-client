import { useState, useContext, useEffect, react } from "react";
import { AuthContext } from '../context/auth.context';

function HomePage() {

    const { isLoggedIn, user } = useContext(AuthContext);

    return(
        <div>
            <h1>HomePage</h1>
            <div className="long-text box-main">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
            </div>
            {isLoggedIn &&
            <div>
                <div id="searchHomestager" className="box">
                    <a href="/search" className='link'><button className='btn btn-primary btn-xlg'>Search Homestager</button></a>
                </div>
                <div id="browsePicture" className="box">
                    <a href="/browse" className='link'><button className='btn btn-primary btn-xlg'>Browse picture</button></a>
                </div>
            </div>
            }
            {/* <div id="login" className="box btn-primary main-page-button">
                <a href="/login" className='link'> <button className='btn'>Login</button></a>
            </div> */}

            {/* <div id="signup" className="box btn-primary main-page-button">
                <a href="/signupuser" className='link'><button className='btn'>Sign up User</button></a>
            </div>

            <div id="signup" className="box btn-primary main-page-button">
                <a href="/signuphomestager" className='link'><button className='btn'>Sign up Hs</button></a>
            </div> */}
            
        </div>
    )
}

export default HomePage