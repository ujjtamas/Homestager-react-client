import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  
  return (
    <nav>
      <Link to="/">
        <button className="btn-primary btn fa fa-home"></button>
      </Link>
      {isLoggedIn && 
        <div>
          <p>Welcome {user && user.name}</p>
        </div>
      }

      {isLoggedIn && (
        <div>
          <Link to={"/editProfile/"+user._id}>
            <button className="btn-primary btn">Profile</button>
          </Link>        
          <button onClick={logOutUser} className="btn-primary btn left-margin1">Logout</button>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          {/* <Link to="/signup"> <button>Sign Up</button> </Link> */}
          <Link to="/login"> <button className="btn-primary btn">Login</button> </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;