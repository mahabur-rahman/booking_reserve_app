import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  // logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">BookingApp</span>
        </Link>

        {/* <div className="navItems">
          <button className="navButton">Register</button>
          <Link to="/login">
            <button className="navButton">
              {user ? <span>Logout</span> : <span>Login</span>}
            </button>
          </Link>
        </div> */}

        {user ? (
          <>
            <span style={{ textTransform: "capitalize" }}>
              {user.username}{" "}
              <span
                style={{
                  marginLeft: ".5rem",
                  color: "#f68f8f",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                Logout
              </span>
            </span>
          </>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
