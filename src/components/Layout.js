// src/components/Layout.js
import React from 'react';
import Nav from './nav';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: '75px' }}> {/* offset for fixed navbar */}
        {children}
      </div>
      <Footer />
    </>
  );
}
