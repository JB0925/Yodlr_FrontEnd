import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/Sidebar.css";

// The slideout sidebar component. Contains links to
// the routes in the application. Takes a "toggleSidebar"
// prop, which is used to close the sidebar when one
// of the links is clicked on.
export default function Sidebar({ toggleSidebar }) {
  return (
    <div className="sidebar">
      <i
        id="closeBtn"
        className="fas fa-window-close"
        onClick={toggleSidebar}
      ></i>
      <h2>Where do you want to go?</h2>
      <ul>
        <div className="sidebar-align">
          <i className="fas fa-user-plus"></i>
          <li>
            <NavLink to="/" activeClassName="active" onClick={toggleSidebar}>
              Register
            </NavLink>
          </li>
        </div>
        <div className="sidebar-align">
          <i className="fas fa-users-cog"></i>
          <li>
            <NavLink
              to="/admin"
              activeClassName="active"
              onClick={toggleSidebar}
            >
              Admin
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
}
