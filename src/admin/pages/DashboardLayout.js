// import React from "react";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
// import {
//   FaUserCircle,
//   FaTachometerAlt,
//   FaUsers,
//   FaChartPie,
//   FaCogs,
//   FaTrash,
//   FaEnvelope,
//   FaCalendarAlt, FaHome
// } from "react-icons/fa";

// const DashboardLayout = ({ user, onLogout }) => {
//   const navigate = useNavigate();
//   const isSuperAdmin = user?.user_type === "super_admin";

//   return (
//     <div className="d-flex">
//       {/* Sidebar */}
//       <div
//         style={{
//           width: "250px",
//           minHeight: "100vh",
//           backgroundColor: "#366000",
//           color: "white",
//           padding: "1rem",
//         }}
//       >
//         <h4 className="text-white mb-4">YUCCA LTD</h4>
//         <Nav className="flex-column">
//           <NavLink to="/admin" className="nav-link text-white">
//             <FaTachometerAlt className="me-2" /> Overview
//           </NavLink>
//           <NavLink to="/admin/users" className="nav-link text-white">
//             <FaUsers className="me-2" /> Users
//           </NavLink>
//           <NavLink to="/admin/bookings" className="nav-link text-white">
//             <FaCalendarAlt className="me-2" /> Bookings
//           </NavLink>
//           <NavLink to="/admin/services" className="nav-link text-white">
//             <FaChartPie className="me-2" /> Services
//           </NavLink>
//           <NavLink to="/admin/messages" className="nav-link text-white">
//             <FaEnvelope className="me-2" /> Messages
//           </NavLink>
          
//           <NavLink to="/admin/homepage/media" className="nav-link text-white">
//           <FaHome className="me-2" />Home
//           </NavLink>
        
         
         
//           {isSuperAdmin && (
//             <NavLink to="/admin/admins" className="nav-link text-white">
//               <FaCogs className="me-2" /> Manage Admins
//             </NavLink>
            
//           )}
//         </Nav>
//       </div>

//       {/* Main Content */}
//       <div style={{ flexGrow: 1 }}>
//         <Navbar expand="lg" className="px-3 d-flex justify-content-between" style={{backgroundColor:'#afc296ff'}}>
//           <Container fluid className="d-flex justify-content-between align-items-center">
//             <div className="d-flex align-items-center">
//               <h5 className="me-3 mb-0">Welcome</h5>
//               <FaUserCircle className="me-2" size={28} />
//               <span className="fw-semibold">{user?.email}</span>
//             </div>
//             <Dropdown align="end">
//               <Dropdown.Toggle variant="light" id="dropdown-user">
//                 Account
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={() => navigate("/admin/profile")}>Profile</Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item onClick={onLogout} className="text-danger">
//                   <FaTrash className="me-2" /> Logout
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Container>
//         </Navbar>

//         <main className="p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaUsers,
  FaChartPie,
  FaCogs,
  FaTrash,
  FaEnvelope,
  FaCalendarAlt,
  FaHome,
  FaAngleDown,
  FaAngleUp, FaLightbulb,FaBox,
  
} from "react-icons/fa";

const DashboardLayout = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const isSuperAdmin = user?.user_type === "super_admin";

  const [homeMenuOpen, setHomeMenuOpen] = useState(false);

  // Sidebar link styles
  const sidebarLinkStyle = {
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    marginBottom: "0.25rem",
    transition: "background-color 0.3s",
    cursor: "pointer",
  };

  const activeLinkStyle = {
    backgroundColor: "#4a7c00", // lighter green for active
  };

  // Style for nested submenu links
  const submenuLinkStyle = {
    ...sidebarLinkStyle,
    paddingLeft: "2.5rem",
    fontSize: "0.9rem",
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          minHeight: "100vh",
          backgroundColor: "#366000",
          color: "white",
          padding: "1rem",
        }}
      >
        <h4 className="text-white mb-4">YUCCA LTD</h4>
        <Nav className="flex-column">
          <NavLink
            to="/admin"
            className="nav-link"
            style={({ isActive }) => ({
              ...sidebarLinkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "#4a7c00";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <FaTachometerAlt className="me-2" /> Overview
          </NavLink>

          <NavLink
            to="/admin/users"
            className="nav-link"
            style={({ isActive }) => ({
              ...sidebarLinkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "#4a7c00";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <FaUsers className="me-2" /> Users
          </NavLink>

          <NavLink
            to="/admin/bookings"
            className="nav-link"
            style={({ isActive }) => ({
              ...sidebarLinkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "#4a7c00";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <FaCalendarAlt className="me-2" /> Bookings
          </NavLink>

          <NavLink
            to="/admin/services"
            className="nav-link"
            style={({ isActive }) => ({
              ...sidebarLinkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "#4a7c00";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <FaChartPie className="me-2" /> Services
          </NavLink>

          <NavLink
            to="/admin/messages"
            className="nav-link"
            style={({ isActive }) => ({
              ...sidebarLinkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "#4a7c00";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <FaEnvelope className="me-2" /> Messages
          </NavLink>

          {/* Home menu with dropdown */}
          <div
            style={{
              ...sidebarLinkStyle,
              justifyContent: "space-between",
              userSelect: "none",
            }}
            onClick={() => setHomeMenuOpen(!homeMenuOpen)}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "#4a7c00";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaHome className="me-2" />
              Home
            </div>
            {homeMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
          </div>

          {homeMenuOpen && (
            <Nav className="flex-column">
              <NavLink
                to="/admin/homepage/intro"
                className="nav-link"
                style={({ isActive }) => ({
                  ...submenuLinkStyle,
                  ...(isActive ? activeLinkStyle : {}),
                })}
              >
                Intro
              </NavLink>
              <NavLink
                to="/admin/homepage/media"
                className="nav-link"
                style={({ isActive }) => ({
                  ...submenuLinkStyle,
                  ...(isActive ? activeLinkStyle : {}),
                })}
              >
                Media
              </NavLink>
              <NavLink
                to="/admin/homepage/section"
                className="nav-link"
                style={({ isActive }) => ({
                  ...submenuLinkStyle,
                  ...(isActive ? activeLinkStyle : {}),
                })}
              >
                Section
              </NavLink>
            </Nav>
          )}


          <NavLink
            to="/admin/AdminAbout"
            className="nav-link"
            style={({ isActive }) => ({
              ...sidebarLinkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "#4a7c00";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <FaLightbulb className="me-2" /> AboutYucca
          </NavLink>

             <NavLink
            to="/admin/product"
            className="nav-link"
            style={({ isActive }) => ({
              ...sidebarLinkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "#4a7c00";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <FaBox className="me-2" /> Products
          </NavLink>

          {isSuperAdmin && (
            <NavLink
              to="/admin/admins"
              className="nav-link"
              style={({ isActive }) => ({
                ...sidebarLinkStyle,
                ...(isActive ? activeLinkStyle : {}),
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.backgroundColor = "#4a7c00";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <FaCogs className="me-2" /> Manage Admins
            </NavLink>
          )}
        </Nav>
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1 }}>
        <Navbar
          expand="lg"
          className="px-3 d-flex justify-content-between"
          style={{ backgroundColor: "#afc296ff" }}
        >
          <Container fluid className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h5 className="me-3 mb-0">Welcome</h5>
              <FaUserCircle className="me-2" size={28} />
              <span className="fw-semibold">{user?.email}</span>
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-user">
                Account
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/admin/profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogout} className="text-danger">
                  <FaTrash className="me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Navbar>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
