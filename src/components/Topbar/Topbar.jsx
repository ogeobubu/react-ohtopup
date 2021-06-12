import "./topbar.css";
import { NotificationsNone, Settings, Menu } from "@material-ui/icons";
import nature from "../../assests/nature.jpg";
import { Link } from "react-router-dom";

const Topbar = ({ setSidebar, sidebar }) => {
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="topBar">
      <div className="topBarContainer">
        <div className="topLeft">
          <div className="navIcon">
            <Menu onClick={() => showSidebar()} />
          </div>
          <Link to="#" className="link">
            <span className="logo">OhTopUp</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topBarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">1</span>
          </div>
          <div className="topBarIconContainer">
            <Settings />
          </div>
          <img src={nature} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
