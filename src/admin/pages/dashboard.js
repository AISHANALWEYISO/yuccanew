// // src/admin/pages/Dashboard.js

// import React, { useEffect, useState } from 'react';
// import api from '../utils/api';
// import { Card, Row, Col } from 'react-bootstrap';
// import { FaUsers, FaTools, FaClipboardList, FaBox, FaSeedling, FaComment } from 'react-icons/fa';

// const Dashboard = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     api.get('/admin/dashboard')
//       .then(res => setData(res.data))
//       .catch(err => console.error('Dashboard error:', err));
//   }, []);

//   if (!data) return <p className="text-center mt-5">Loading dashboard...</p>;

//   const stats = data.stats;

//   const cards = [
//     { title: 'Total Users', count: stats.total_users, icon: <FaUsers size={30} />, color: 'primary' },
//     { title: 'Total Services', count: stats.total_services, icon: <FaTools size={30} />, color: 'success' },
//     { title: 'Total Bookings', count: stats.total_bookings, icon: <FaClipboardList size={30} />, color: 'info' },
//     { title: 'Total Products', count: stats.total_products, icon: <FaBox size={30} />, color: 'warning' },
//     { title: 'Total Farmers', count: stats.total_farmers, icon: <FaSeedling size={30} />, color: 'danger' },
//     { title: 'Total Feedback', count: stats.total_feedback, icon: <FaComment size={30} />, color: 'secondary' }
//   ];

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4 text-center">{data.welcome}</h2>
//       <Row>
//         {cards.map((card, idx) => (
//           <Col key={idx} md={4} className="mb-4">
//             <Card border={card.color} className="shadow-sm h-100">
//               <Card.Body className="text-center">
//                 <div className={`text-${card.color} mb-3`}>
//                   {card.icon}
//                 </div>
//                 <h5>{card.title}</h5>
//                 <h3>{card.count}</h3>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// // export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { FaUsers, FaCalendarCheck, FaLeaf, FaUserShield, FaComments } from "react-icons/fa";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const AdminDashboard = ({ userType, userName, onLogout }) => {
//   const [stats, setStats] = useState({
//     totalBookings: 0,
//     totalUsers: 0,
//     totalFarmers: 0,
//   });

//   const [feedbacks, setFeedbacks] = useState([]);
//   const [feedbackRatingsCount, setFeedbackRatingsCount] = useState([0, 0, 0, 0, 0]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get("/api/v1/dashboard/stats", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         });
//         setStats(res.data);
//       } catch (err) {
//         console.error("Failed to fetch stats", err);
//       }
//     };

//     const fetchFeedbacks = async () => {
//       try {
//         const res = await axios.get("/api/v1/feedbacks", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         });
//         setFeedbacks(res.data.feedbacks);
//         const counts = [0, 0, 0, 0, 0];
//         res.data.feedbacks.forEach(fb => {
//           if(fb.rating >= 1 && fb.rating <= 5) counts[fb.rating - 1]++;
//         });
//         setFeedbackRatingsCount(counts);
//       } catch (err) {
//         console.error("Failed to fetch feedbacks", err);
//       }
//     };

//     fetchStats();
//     fetchFeedbacks();
//   }, []);

//   const data = {
//     labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
//     datasets: [
//       {
//         label: "# of Ratings",
//         data: feedbackRatingsCount,
//         backgroundColor: [
//           "#FF6384",
//           "#FF9F40",
//           "#FFCD56",
//           "#4BC0C0",
//           "#36A2EB"
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
//       {/* Sidebar */}
//       <nav style={{
//         width: "220px",
//         backgroundColor: "#274800",
//         color: "white",
//         display: "flex",
//         flexDirection: "column",
//         padding: "2rem 1rem",
//         boxSizing: "border-box"
//       }}>
//         <h2 style={{ color: "#B4D46E", marginBottom: "2rem", textAlign: "center" }}>Agro Admin</h2>
//         <a href="#dashboard" style={navLinkStyle}><FaCalendarCheck style={{marginRight:"8px"}} /> Dashboard</a>
//         {userType === "superadmin" && <a href="#manageAdmins" style={navLinkStyle}><FaUserShield style={{marginRight:"8px"}} /> Manage Admins</a>}
//         <a href="#users" style={navLinkStyle}><FaUsers style={{marginRight:"8px"}} /> Users</a>
//         <a href="#bookings" style={navLinkStyle}><FaCalendarCheck style={{marginRight:"8px"}} /> Bookings</a>
//         <a href="#feedback" style={navLinkStyle}><FaComments style={{marginRight:"8px"}} /> Feedback</a>
//       </nav>

//       {/* Main content */}
//       <main style={{ flexGrow: 1, backgroundColor: "#E7F0D6", padding: "2rem 3rem" }}>
//         {/* Header */}
//         <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
//           <h1 style={{ color: "#366000" }}>Dashboard</h1>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <div style={{ marginRight: "1.5rem", color: "#274800", fontWeight: "600" }}>
//               Logged in as: <span style={{ fontWeight: "bold" }}>{userName}</span> ({userType})
//             </div>
//             <button
//               onClick={onLogout}
//               style={{
//                 backgroundColor: "#366000",
//                 color: "white",
//                 border: "none",
//                 padding: "8px 16px",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 fontWeight: "600"
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         </header>

//         {/* Stats Cards */}
//         <section style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
//           <StatCard icon={<FaCalendarCheck size={28} color="#366000" />} title="Total Bookings" value={stats.totalBookings} />
//           <StatCard icon={<FaUsers size={28} color="#366000" />} title="Total Users" value={stats.totalUsers} />
//           <StatCard icon={<FaLeaf size={28} color="#366000" />} title="Total Farmers" value={stats.totalFarmers} />
//         </section>

//         {/* Conditional Superadmin Section */}
//         {userType === "superadmin" && (
//           <section
//             style={{
//               backgroundColor: "#d7e6b1",
//               padding: "1.5rem",
//               borderRadius: "10px",
//               marginBottom: "2rem",
//               boxShadow: "0 2px 6px rgba(54,96,0,0.25)"
//             }}
//           >
//             <h2 style={{ color: "#274800" }}>Manage Admins</h2>
//             <p>As a superadmin, you can create and manage admin accounts here.</p>
//             {/* Add your Manage Admins UI here */}
//           </section>
//         )}

//         {/* Pie Chart for Feedback Ratings */}
//         <section
//           style={{
//             backgroundColor: "#f5fbe9",
//             padding: "1.5rem",
//             borderRadius: "10px",
//             marginBottom: "2rem",
//             boxShadow: "0 2px 6px rgba(54,96,0,0.15)"
//           }}
//         >
//           <h2 style={{ color: "#274800", marginBottom: "1rem" }}>Feedback Ratings Distribution</h2>
//           <Pie data={data} />
//         </section>

//         {/* Recent Feedback */}
//         <section>
//           <h2 style={{ color: "#274800", marginBottom: "1rem" }}>Recent Feedback</h2>
//           {feedbacks.length === 0 ? (
//             <p>No feedback available.</p>
//           ) : (
//             <ul style={{ listStyle: "none", paddingLeft: 0, maxHeight: "300px", overflowY: "auto" }}>
//               {feedbacks.slice(0, 5).map((fb) => (
//                 <li
//                   key={fb.feedback_id}
//                   style={{
//                     backgroundColor: "#f0f8e8",
//                     marginBottom: "0.8rem",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 1px 3px rgba(54,96,0,0.1)"
//                   }}
//                 >
//                   <p><strong>Farmer ID:</strong> {fb.farmer_id} | <strong>Service:</strong> {fb.service_name}</p>
//                   <p>Rating: {fb.rating} ⭐</p>
//                   <p>Comment: {fb.comment || "No comment"}</p>
//                   <p style={{ fontSize: "0.75rem", color: "#555" }}>{new Date(fb.created_at).toLocaleString()}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// const StatCard = ({ icon, title, value }) => (
//   <div style={{
//     flex: 1,
//     backgroundColor: "#d7e6b1",
//     borderRadius: "10px",
//     padding: "1.5rem",
//     boxShadow: "0 3px 6px rgba(54,96,0,0.3)",
//     display: "flex",
//     alignItems: "center",
//     gap: "1rem"
//   }}>
//     <div style={{ backgroundColor: "#366000", borderRadius: "50%", width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
//       {icon}
//     </div>
//     <div>
//       <h3 style={{ margin: 0, color: "#274800" }}>{title}</h3>
//       <p style={{ fontSize: "1.8rem", fontWeight: "700", margin: 0, color: "#366000" }}>{value}</p>
//     </div>
//   </div>
// );

// const navLinkStyle = {
//   color: "white",
//   textDecoration: "none",
//   fontWeight: "600",
//   padding: "10px 0",
//   borderBottom: "1px solid rgba(255,255,255,0.1)",
//   display: "flex",
//   alignItems: "center",
//   cursor: "pointer"
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { getToken } from '../utils/auth';
import axios from 'axios';

// Chart.js registration
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    products: 0,
    services: 0,
    farmers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        // Set values from nested "stats" object in backend response
        setStats({
          users: res.data.stats.total_users,
          bookings: res.data.stats.total_bookings,
          products: res.data.stats.total_products,
          services: res.data.stats.total_services,
          farmers: res.data.stats.total_farmers,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const chartData = {
    labels: ['Users', 'Bookings', 'Products', 'Services', 'Farmers'],
    datasets: [
      {
        label: 'Total Count',
        backgroundColor: ['#366000', '#69A000', '#A3C300', '#8BBD46', '#B6D957'],
        data: [
          stats.users,
          stats.bookings,
          stats.products,
          stats.services,
          stats.farmers,
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Container fluid className="p-4">
      <h3 className="mb-4">Admin Dashboard Overview</h3>
      <Row className="mb-4">
        {[
          { label: 'Total Users', value: stats.users },
          { label: 'Bookings', value: stats.bookings },
          { label: 'Products', value: stats.products },
          { label: 'Services', value: stats.services },
          { label: 'Farmers', value: stats.farmers },
        ].map((item, i) => (
          <Col key={i} md={2}>
            <Card className="text-center shadow-sm mb-3">
              <Card.Body>
                <Card.Title>{item.label}</Card.Title>
                <Card.Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {item.value}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="p-4 shadow-sm">
        <h5 className="mb-3">Activity Bar Chart</h5>
        <Bar data={chartData} options={chartOptions} />
      </Card>
    </Container>
  );
};

export default Dashboard;


