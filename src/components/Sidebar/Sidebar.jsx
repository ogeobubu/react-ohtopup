import "./sidebar.css";
import { Link } from "react-router-dom";
import SidebarData from "../Sidebar/SidebarData";

const Sidebar = ({ sidebar }) => {
  console.log(sidebar);
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
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
