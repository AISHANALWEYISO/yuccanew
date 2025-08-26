// import React from "react";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
// import {
//   FaUserCircle,
//   FaTachometerAlt,
//   FaUsers,
//   FaChartPie,
//   FaCogs,
//   FaEnvelope,
//   FaCalendarAlt,
//   FaHome,
//   FaLightbulb,
//   FaBox,
//   FaColumns,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import "../../styles/dashlayout.css";

// const DashboardLayout = ({ user, onLogout }) => {
//   const navigate = useNavigate();
//   const isSuperAdmin = user?.user_type === "super_admin";

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h4 className="text-white mb-4">YUCCA LTD</h4>
//         <Nav className="flex-column">
//           <NavLink to="/admin" className="nav-link">
//             <FaTachometerAlt className="me-2" /> Overview
//           </NavLink>
//           <NavLink to="/admin/users" className="nav-link">
//             <FaUsers className="me-2" /> Users
//           </NavLink>
//           <NavLink to="/admin/bookings" className="nav-link">
//             <FaCalendarAlt className="me-2" /> Bookings
//           </NavLink>
//           <NavLink to="/admin/services" className="nav-link">
//             <FaChartPie className="me-2" /> Services
//           </NavLink>
//           <NavLink to="/admin/messages" className="nav-link">
//             <FaEnvelope className="me-2" /> Messages
//           </NavLink>
//           <NavLink to="/admin/homepage" className="nav-link">
//             <FaHome className="me-2" /> Manage Homepage
//           </NavLink>
//           <NavLink to="/admin/AdminAbout" className="nav-link">
//             <FaLightbulb className="me-2" /> Manage AboutUs
//           </NavLink>
//           <NavLink to="/admin/product" className="nav-link">
//             <FaBox className="me-2" /> Products
//           </NavLink>
//           <NavLink to="/admin/team" className="nav-link">
//             <FaUsers className="me-2" /> Manage Team
//           </NavLink>
//           <NavLink to="/admin/footer" className="nav-link">
//             <FaColumns className="me-2" /> Manage Footer
//           </NavLink>
//           {isSuperAdmin && (
//             <NavLink to="/admin/admins" className="nav-link">
//               <FaCogs className="me-2" /> Manage Admins
//             </NavLink>
//           )}
//         </Nav>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <Navbar
//           expand="lg"
//           className="px-3 d-flex justify-content-between"
//           style={{ backgroundColor: "#afc296ff" }}
//         >
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
//                 <Dropdown.Item onClick={() => navigate("/admin/profile")}>
//                   Profile
//                 </Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item onClick={onLogout} className="text-danger">
//                   <FaSignOutAlt className="me-2" /> Logout
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

import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaUsers,
  FaChartPie,
  FaCogs,
  FaEnvelope,
  FaCalendarAlt,
  FaHome,
  FaLightbulb,
  FaBox,
  FaColumns,
  FaSignOutAlt,
} from "react-icons/fa";
import "../../styles/dashlayout.css";

const DashboardLayout = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const isSuperAdmin = user?.user_type === "super_admin";

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h4 className="text-white mb-4">YUCCA LTD</h4>
        <Nav className="flex-column">
          <NavLink to="/admin" className="nav-link">
            <FaTachometerAlt className="me-2" /> Overview
          </NavLink>
          <NavLink to="/admin/users" className="nav-link">
            <FaUsers className="me-2" /> Users
          </NavLink>
          <NavLink to="/admin/bookings" className="nav-link">
            <FaCalendarAlt className="me-2" /> Bookings
          </NavLink>
          <NavLink to="/admin/services" className="nav-link">
            <FaChartPie className="me-2" /> Services
          </NavLink>
          <NavLink to="/admin/messages" className="nav-link">
            <FaEnvelope className="me-2" /> Messages
          </NavLink>
          <NavLink to="/admin/homepage" className="nav-link">
            <FaHome className="me-2" /> Manage Homepage
          </NavLink>
          <NavLink to="/admin/AdminAbout" className="nav-link">
            <FaLightbulb className="me-2" /> Manage AboutUs
          </NavLink>
          <NavLink to="/admin/product" className="nav-link">
            <FaBox className="me-2" /> Products
          </NavLink>
          <NavLink to="/admin/team" className="nav-link">
            <FaUsers className="me-2" /> Manage Team
          </NavLink>
          <NavLink to="/admin/footer" className="nav-link">
            <FaColumns className="me-2" /> Manage Footer
          </NavLink>
          {isSuperAdmin && (
            <NavLink to="/admin/admins" className="nav-link">
              <FaCogs className="me-2" /> Manage Admins
            </NavLink>
          )}
        </Nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Fixed Topbar */}
        <Navbar expand="lg" className="topbar">
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
                  <FaSignOutAlt className="me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Navbar>

        {/* Scrollable Content */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
