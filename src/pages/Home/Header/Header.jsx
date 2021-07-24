import "./header.css";
import { useState } from "react";
import { Menu, Close } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const [click, setClick] = useState(false);

  const { isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      localStorage.removeItem("firstLogin");
      return (window.location.href = "/");
    } catch (error) {
      return (window.location.href = "/");
    }
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="left">
          <h3>OhTopUp</h3>
        </div>
        <div className="middle">
          <nav>
            <ul>
              <Link to="/" className="link">
                <li>Home</li>
              </Link>
              <Link to="/pricing" className="link">
                <li>Data Pricing</li>
              </Link>
              <Link to="/faq" className="link">
                <li>FAQ</li>
              </Link>
              {isLogged ? (
                <Link to="/dashboard" className="link">
                  <li>Dashboard</li>
                </Link>
              ) : (
                <Link to="/auth" className="link">
                  <li>Sign In</li>
                </Link>
              )}
              {isLogged ? <li onClick={handleLogout}>Logout</li> : null}
            </ul>
          </nav>
        </div>
        {isLogged ? (
          <div className="right">
            <Link to="/dashboard" className="button link">
              My Account
            </Link>
          </div>
        ) : (
          <div className="right">
            <span className="button">Sign Up</span>
          </div>
        )}

        <div className="mobile-menu" onClick={() => setClick(!click)}>
          {click ? <Close className="menu" /> : <Menu className="menu" />}
        </div>
        <div className={click ? "mobile-nav open" : "mobile-nav"}>
          <div className="mobile-nav-container">
            <div className="mobileLists">
              <ul>
                <Link to="/" className="link">
                  <li>Home</li>
                </Link>
                <Link to="/pricing" className="link">
                  <li>Data Pricing</li>
                </Link>
                <Link to="/faq" className="link">
                  <li>FAQ</li>
                </Link>
                {isLogged ? (
                  <Link to="/dashboard" className="link">
                    <li>Dashboard</li>
                  </Link>
                ) : (
                  <Link to="/auth" className="link">
                    <li>Sign In</li>
                  </Link>
                )}
                {isLogged ? <li onClick={handleLogout}>Logout</li> : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
