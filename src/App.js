

import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";

// Public pages
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/contact';
import Services from './components/service';
import Products from './components/products';
import Team from './components/team';
import Nav from './components/nav';
import Footer from './components/footer';
import Booking from './components/Booking';

// Admin pages
import Login from './admin/pages/login';
import Users from './admin/pages/ShowUsers';
import Farmers from './admin/pages/farmers';
import Bookings from './admin/pages/bookings';
import AdminServices from './admin/pages/services';
import Feedback from './admin/pages/feedback';
import Message from './admin/pages/contact';
import DashboardLayout from './admin/pages/DashboardLayout';
import Overview from './admin/pages/overview';
import Admins from './admin/pages/admins';
import AdminProfile from './admin/pages/Profile';
import AdminAbout from './admin/pages/AdminAbout'
import AdminProducts from './admin/pages/Adminproduct'
import Homepage from './admin/pages/homepage'
import Foot from './admin/pages/adminfooter'
import Teamdash from './admin/pages/adminteam'

// Layout wrapper for public pages
const PublicLayout = ({ children }) => (
  <div style={{ paddingTop: '75px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    {children}
  </div>
);

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      {!isAdminRoute && <Nav />}

      {isAdminRoute ? (
        // Admin routes
        <div className="p-0">
          <Routes>
            <Route path="/login" element={<Login />} />
            {isAuthenticated ? (
              <Route
                path="/admin"
                element={
                  <DashboardLayout
                    user={user}
                    onLogout={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.href = '/login';
                    }}
                  />
                }
              >
                <Route index element={<Overview />} />
                <Route path="users" element={<Users />} />
                <Route path="farmers" element={<Farmers />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="messages" element={<Message />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="AdminAbout" element={<AdminAbout />} />
                <Route path="product" element={<AdminProducts />} />
                <Route path="homepage" element={<Homepage />} />
                <Route path="footer" element={<Foot />} />
                <Route path="team" element={<Teamdash />} />
                {user?.user_type === 'super_admin' && <Route path="admins" element={<Admins />} />}
              </Route>
            ) : (
              <Route path="/admin/*" element={<Navigate to="/login" />} />
            )}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      ) : (
        // Public routes with navbar spacing
        <PublicLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/our-team" element={<Team />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </PublicLayout>
      )}
    </>
  );
}

export default App;
