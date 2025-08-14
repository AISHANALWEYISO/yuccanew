import React from "react";
import { Link, useLocation } from "react-router-dom";
import {  FaUsers, FaHome, FaCalendarAlt, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = ({ userRole }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-dark text-white vh-100 d-flex flex-column p-3" style={{ width: "240px" }}>
      <h4 className="text-center mb-4" style={{ color: "#A8E890" }}>Agro Dashboard</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link to="/overview" className={`nav-link ${isActive("/overview") ? "bg-success text-white" : "text-white"}`}>
            <FaHome className="me-2" /> Overview
          </Link>
        </li>
        <li>
          <Link to="/bookings" className={`nav-link ${isActive("/bookings") ? "bg-success text-white" : "text-white"}`}>
            <FaCalendarAlt className="me-2" /> Bookings
          </Link>
        </li>
        <li>
          <Link to="/users" className={`nav-link ${isActive("/users") ? "bg-success text-white" : "text-white"}`}>
            <FaUsers className="me-2" /> Users
          </Link>
        </li>
        {userRole === "superadmin" && (
          <li>
            <Link to="/admins" className={`nav-link ${isActive("/admins") ? "bg-success text-white" : "text-white"}`}>
              <FaUserShield className="me-2" /> Manage Admins
            </Link>
          </li>
        )}
      </ul>

      <div className="mt-auto">
        <Link to="/logout" className="nav-link text-danger">
          <FaSignOutAlt className="me-2" /> Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;


