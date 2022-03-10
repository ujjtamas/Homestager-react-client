import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Footer() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  console.log(user);
  return (
    <footer>
      {/* {isLoggedIn && (
        <div>
          <Link to={"/editProfile/"+user._id}>
            <button className="btn-primary btn">Profile</button>
          </Link>        
          <button onClick={logOutUser} className="btn-primary btn left-margin1">Logout</button>
        </div>
      )} */}

      {!isLoggedIn && (
        <div className="flex flex-row flex-stretch">
                <a href="/signupuser" className="link"><button className="btn btn-sm btn-success">Sign up as User</button></a>
                <a href="/signuphomestager" className="link"><button className="btn btn-sm btn-success left-margin1">Sign up as Homestager</button></a>
        </div>
      )}
    </footer>
  );
}

export default Footer;