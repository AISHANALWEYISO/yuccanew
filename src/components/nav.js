// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../images/logo1.png';

// const NavbarComponent = () => {
//   const [aboutOpen, setAboutOpen] = useState(false);

//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.logoContainer}>
//         <Link to="/">
//           <img src={logo} alt="Yucca Logo" style={styles.logo} />
//         </Link>
//       </div>

//       <ul style={styles.navLinks}>
//         <li><Link to="/" style={styles.link}>Home</Link></li>

//         <li 
//           style={{ position: 'relative' }} 
//           onMouseEnter={() => setAboutOpen(true)} 
//           onMouseLeave={() => setAboutOpen(false)}
//         >
//           <span style={{ ...styles.link, cursor: 'pointer' }}>
//             About▼
//           </span>
//           {aboutOpen && (
//             <ul style={styles.dropdown}>
//               <li><Link to="/about" style={styles.dropdownLink}>Our Story</Link></li>
//               <li><Link to="/products" style={styles.dropdownLink}>Products</Link></li>
//               <li><Link to="/our-team" style={styles.dropdownLink}>Our Team</Link></li>
//             </ul>
//           )}
//         </li>

//         <li><Link to="/services" style={styles.link}>Services</Link></li>
//         <li><Link to="/contact" style={styles.link}>Contact</Link></li>
//       </ul>
//     </nav>
//   );
// };

// const styles = {
//   navbar: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: '10px 40px',
//     backgroundColor: '#cbdbcfff',  // your greenish brand color or any color you prefer
//     color: '#366000',
//     justifyContent: 'space-between',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//     fontWeight: 'bolder',
//     position: 'relative',
//     zIndex: 1000,
//   },
//   logoContainer: {
//     flexShrink: 0,
//   },
//   logo: {
//     height: '90px',
//     width: 'auto',
//   },
//   navLinks: {
//     listStyle: 'none',
//     display: 'flex',
//     gap: '30px',
//     margin: 0,
//     padding: 0,
//     alignItems:'center center'
//   },
//   link: {
//     color: '#366000',
//     textDecoration: 'none',
//     fontWeight: 'bold',
//     fontSize: '20px',
//   },
//   dropdown: {
//     position: 'absolute',
//     top: '100%',
//     left: 0,
//     backgroundColor: '#E0EAE2',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
//     borderRadius: '4px',
//     padding: '10px 0',
//     minWidth: '160px',
//     listStyle: 'none',
//     zIndex: 1000,
//   },
//   dropdownLink: {
//     display: 'block',
//     padding: '8px 20px',
//     color: '#366000',
//     textDecoration: 'none',
//     fontWeight: 'normal',
//     fontSize: '15px',
//   }
// };

// export default NavbarComponent;

// src/components/NavbarComponent.js


// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import logo from '../images/logo1.png';
// import '../styles/navbar.css'; // import CSS

// const NavbarComponent = () => {
//   const [aboutOpen, setAboutOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();

//   // Close dropdown and menu when navigating
//   useEffect(() => {
//     setAboutOpen(false);
//     setMenuOpen(false);
//   }, [location]);

//   return (
//     <nav className="navbar">
//       <div className="container">
//         {/* Logo */}
//         <Link to="/" className="logo-link">
//           <img src={logo} alt="Yucca Logo" className="logo" />
//         </Link>

//         {/* Hamburger */}
//         <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>

//         {/* Navigation Links */}
//         <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
//           <li><Link to="/" className="nav-link">Home</Link></li>

//           <li className="about-item">
//             <span onClick={() => setAboutOpen(!aboutOpen)} className="nav-link">
//               About ▾
//             </span>
//             {aboutOpen && (
//               <ul className="dropdown">
//                 <li><Link to="/about" className="dropdown-link">Our Story</Link></li>
//                 <li><Link to="/products" className="dropdown-link">Products</Link></li>
//                 <li><Link to="/our-team" className="dropdown-link">Our Team</Link></li>
//               </ul>
//             )}
//           </li>

//           <li><Link to="/services" className="nav-link">Services</Link></li>
//           <li><Link to="/contact" className="nav-link">Contact</Link></li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default NavbarComponent;




import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo1.png';
import '../styles/navbar.css';

const NavbarComponent = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close dropdown and menu on route change
  useEffect(() => {
    setAboutOpen(false);
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo-link">
          <img src={logo} alt="Yucca Logo" className="navbar-logo" />
        </Link>

        {/* Hamburger */}
        <div
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className="navbar-link">Home</Link></li>

          <li className="navbar-about-item">
            <span
              onClick={() => setAboutOpen(!aboutOpen)}
              className="navbar-link navbar-about-link"
            >
              About ▾
            </span>
            <ul className={`navbar-dropdown ${aboutOpen ? 'open' : ''}`}>
              <li><Link to="/about" className="navbar-dropdown-link">Our Story</Link></li>
              <li><Link to="/products" className="navbar-dropdown-link">Products</Link></li>
              <li><Link to="/our-team" className="navbar-dropdown-link">Our Team</Link></li>
            </ul>
          </li>

          <li><Link to="/services" className="navbar-link">Services</Link></li>
          <li><Link to="/contact" className="navbar-link">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;

