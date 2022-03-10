import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  console.log(user);
  return (
    <nav>
      <Link to="/">
        <button className="btn">Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to={"/editProfile/"+user._id}>
            <button>Profile</button>
          </Link>        
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}
 
      {!isLoggedIn && (
        <>
          {/* <Link to="/signup"> <button>Sign Up</button> </Link> */}
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;