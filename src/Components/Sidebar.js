import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/Sidebar.css";

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
