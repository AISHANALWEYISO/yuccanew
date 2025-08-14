import React from 'react';
import logo from '../images/logo.png'; // use your uploaded file here

const LogoWithText = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '15px',  // spacing between logo and text
      flexWrap: 'wrap'  // responsive wrapping on small screens
    }}>
      <img src={logo} alt="Yucca Logo" style={{ height: '100px' }} />
      <div>
        <h2 style={{ margin: 0, color: 'green' }}>YUCCA</h2>
        <p style={{ margin: 0, color: 'green', fontSize: '14px' }}>
          CULTIVATING A SUSTAINABLE WORLD
        </p>
      </div>
    </div>
  );
};

export default LogoWithText;
