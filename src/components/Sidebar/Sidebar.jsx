import "./sidebar.css";
import { Link } from "react-router-dom";
import SidebarData from "../Sidebar/SidebarData";
import { ExitToApp } from "@material-ui/icons";
import axios from "axios";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebar }) => {
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (error) {
      window.location.href = "/";
    }
  };
  return (
    <>
      <div className={sidebar ? "sidebar" : "noSidebar"}>
        <div className="sidebarContainer">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Main / Transactions</h3>
            <ul className="sidebarList">
              {SidebarData.map((sidebarItem) => (
                <Link className="link" to={sidebarItem.path}>
                  <li className="sidebarListItem">
                    {sidebarItem.icon}
                    {sidebarItem.title}
                  </li>
                </Link>
              ))}
              {isAdmin && (
                <Link className="link" to="/dashboard/admin">
                  <li className="sidebarListItem">
                    <ExitToApp className="sidebarIcon" />
                    Admin Dashboard
                  </li>
                </Link>
              )}
              <Link onClick={handleLogout} className="link" to="/">
                <li className="sidebarListItem">
                  <ExitToApp className="sidebarIcon" />
                  Logout
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
