
// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import logo from '../images/logo1.png';
// import '../styles/navbar.css';

// const NavbarComponent = () => {
//   const [aboutOpen, setAboutOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();

//   // Close dropdown and menu on route change
//   useEffect(() => {
//     setAboutOpen(false);
//     setMenuOpen(false);
//   }, [location]);

//   return (
//     <nav className="navbar-container">
//       <div className="navbar-inner">
//         {/* Logo */}
//         <Link to="/" className="navbar-logo-link">
//           <img src={logo} alt="Yucca Logo" className="navbar-logo" />
//         </Link>

//         {/* Hamburger */}
//         <div
//           className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>

//         {/* Navigation Links */}
//         <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
//           <li><Link to="/" className="navbar-link">Home</Link></li>

//           <li className="navbar-about-item">
//             <span
//               onClick={() => setAboutOpen(!aboutOpen)}
//               className="navbar-link navbar-about-link"
//             >
//               About ▾
//             </span>
//             <ul className={`navbar-dropdown ${aboutOpen ? 'open' : ''}`}>
//               <li><Link to="/about" className="navbar-dropdown-link">Our Story</Link></li>
//               <li><Link to="/products" className="navbar-dropdown-link">Products</Link></li>
//               <li><Link to="/our-team" className="navbar-dropdown-link">Our Team</Link></li>
//             </ul>
//           </li>

//           <li><Link to="/services" className="navbar-link">Services</Link></li>
//           <li><Link to="/contact" className="navbar-link">Contact</Link></li>
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

const Nav = () => {
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

        {/* Hamburger (Mobile) */}
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
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className="navbar-link navbar-about-link dropdown-btn"
              aria-expanded={aboutOpen}
            >
              About ▾
            </button>
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

export default Nav;
