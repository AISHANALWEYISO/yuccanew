// // admin/pages/Homepage/HomepageDashboard.js
// import React from "react";
// import Intro from "./Intro";
// import Media from "./Media";
// import Section from "./homesection";

// const HomepageDashboard = () => {
//   return (
//     <div>
//       <h2>Manage Homepage Content</h2>

//       <section style={{ marginBottom: "2rem" }}>
//         <h3>Intro</h3>
//         <Intro />
//       </section>

//       <section style={{ marginBottom: "2rem" }}>
//         <h3>Media</h3>
//         <Media />
//       </section>

//       <section style={{ marginBottom: "2rem" }}>
//         <h3>Sections</h3>
//         <Section />
//       </section>
//     </div>
//   );
// };

// export default HomepageDashboard;

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const HomepageDashboard = () => {
  const linkStyle = {
    padding: '10px 15px',
    textDecoration: 'none',
    color: '#366000',
    borderBottom: '3px solid transparent',
    fontWeight: 'bold',
    marginRight: '1rem',
  };

  const activeLinkStyle = {
    borderBottom: '3px solid #366000',
    color: '#2a4a00',
  };

  return (
    <div>
      <h2>Manage Homepage</h2>

      <nav style={{ marginBottom: '2rem' }}>
        <NavLink
          to="intro"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
        >
          Intro
        </NavLink>

        <NavLink
          to="media"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
        >
          Media
        </NavLink>

        <NavLink
          to="section"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
        >
          Section
        </NavLink>
      </nav>

      {/* Outlet to render the selected section component */}
      <Outlet />
    </div>
  );
};

export default HomepageDashboard;
