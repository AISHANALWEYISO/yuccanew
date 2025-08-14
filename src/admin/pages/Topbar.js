import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Topbar = ({ userEmail, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm" style={{ padding: "0.8rem 1rem" }}>
      <Container fluid>
        <Navbar.Brand style={{ color: "#366000", fontWeight: "bold" }}>Agro Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown
              title={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <FaUserCircle size={20} style={{ marginRight: "5px", color: "#366000" }} />
                  <span style={{ fontWeight: "bold", color: "#366000" }}>{userEmail}</span>
                </span>
              }
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={() => navigate("/profile")}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} style={{ color: "red" }}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;