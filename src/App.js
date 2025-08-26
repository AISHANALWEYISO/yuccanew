

import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
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
// Home dashboard management pages grouped under homepage folder
// import Intro from './admin/pages/Homepage/Intro';
// import Media from './admin/pages/Homepage/Media';
// import Section from './admin/pages/Homepage/homesection';
// import HomepageDashboard from './admin/pages/Homepage/homedashboard';
import Homepage from './admin/pages/homepage'
import Foot from './admin/pages/adminfooter'
// import Team from './admin/pages/adminteam'

function App() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith('/admin') || location.pathname === '/login';

  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      {!isAdminRoute && <Nav />}

      <div className={!isAdminRoute ? 'container mt-4' : 'p-0'}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/our-team" element={<Team />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/booking" element={<Booking />} />

          {/* Admin Login */}
          <Route path="/login" element={<Login />} />

          {/* Admin Dashboard Routes */}
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
              <Route path="footer" element={< Foot />} />
              <Route path="team" element={< Team />} />

              {/* Home dashboard nested routes */}
              {/* <Route path="homepage" element={<HomepageDashboard />}>
                <Route index element={<Navigate to="intro" replace />} />
                <Route path="intro" element={<Intro />} />
                <Route path="media" element={<Media />} />
                <Route path="section" element={<Section />} />
              </Route> */}

              {user?.user_type === 'super_admin' && (
                <Route path="admins" element={<Admins />} />
              )}
            </Route>
          ) : (
            <Route path="/admin/*" element={<Navigate to="/login" />} />
          )}

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
