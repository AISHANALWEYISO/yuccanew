// import React, { useEffect, useState } from "react";
// import { Card, CardBody } from "react-bootstrap";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const Overview = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchOverviewData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/v1/dashboard/overview", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(res.data);
//       } catch (err) {
//         console.error("Error fetching overview data:", err);
//       }
//     };

//     fetchOverviewData();
//   }, []);

//   if (!data) {
//     return <p className="text-center mt-5">Loading...</p>;
//   }

//   // Bar chart for bookings per month
//   const chartData = {
//     labels: data.monthly_bookings.map((b) => b.month),
//     datasets: [
//       {
//         label: "Bookings per Month",
//         data: data.monthly_bookings.map((b) => b.count),
//         backgroundColor: "#366000",
//       },
//     ],
//   };

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4" style={{ color: "#366000" }}>
//         Dashboard Overview
//       </h3>

//       <div className="row mb-4">
//         <div className="col-md-3">
//           <Card className="shadow-sm">
//             <CardBody>
//               <h5>Total Bookings</h5>
//               <h3>{data.total_bookings}</h3>
//             </CardBody>
//           </Card>
//         </div>

//         <div className="col-md-3">
//           <Card className="shadow-sm">
//             <CardBody>
//               <h5>Confirmed Bookings</h5>
//               <h3>{data.Confirmed_bookings}</h3>
//             </CardBody>
//           </Card>
//         </div>

//         <div className="col-md-3">
//           <Card className="shadow-sm">
//             <CardBody>
//               <h5>Total Users</h5>
//               <h3>{data.total_users}</h3>
//             </CardBody>
//           </Card>
//         </div>

//         <div className="col-md-3">
//           <Card className="shadow-sm">
//             <CardBody>
//               <h5>Total Admins</h5>
//               <h3>{data.total_admins}</h3>
//             </CardBody>
//           </Card>
//         </div>
//       </div>

//       <div className="row mb-4">
//         <div className="col-md-3">
//           <Card className="shadow-sm">
//             <CardBody>
//               <h5>Services</h5>
//               <h3>{data.total_services}</h3>
//             </CardBody>
//           </Card>
//         </div>

//         <div className="col-md-3">
//           <Card className="shadow-sm">
//             <CardBody>
//               <h5>Feedbacks</h5>
//               <h3>{data.feedbacks}</h3>
//             </CardBody>
//           </Card>
//         </div>

//         <div className="col-md-3">
//           <Card className="shadow-sm">
//             <CardBody>
//               <h5>Messages</h5>
//               <h3>{data.messages}</h3>
//             </CardBody>
//           </Card>
//         </div>

//         <div className="col-md-3">
//           <Card className="shadow-sm">
//             <CardBody>
//               <h5>Pending Bookings</h5>
//               <h3>{data.pending_bookings}</h3>
//             </CardBody>
//           </Card>
//         </div>
//       </div>

//       <div className="card shadow-sm p-4">
//         <h5 style={{ color: "#366000" }}>Bookings by Month</h5>
//         <Bar data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default Overview;


import React, { useEffect, useState } from "react";
import { Card, CardBody } from "react-bootstrap";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const Overview = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/v1/dashboard/overview", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Error fetching overview data:", err);
      }
    };
    fetchOverviewData();
  }, []);

  if (!data) return <p className="text-center mt-5">Loading...</p>;

  // Bar chart for monthly bookings
  const barChartData = {
    labels: data.monthly_bookings.map((b) => b.month),
    datasets: [
      {
        label: "Bookings per Month",
        data: data.monthly_bookings.map((b) => b.count),
        backgroundColor: "#366000",
      },
    ],
  };

  // Pie chart for bookings per service
  const pieChartData = {
    labels: data.bookings_per_service.map((s) => s.service),
    datasets: [
      {
        label: "Bookings by Service",
        data: data.bookings_per_service.map((s) => s.count),
        backgroundColor: data.bookings_per_service.map(
          () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        ),
      },
    ],
  };

  const cardStyle = { backgroundColor: "#e6f2e6", height: "130px" };

  return (
    <div className="container-fluid mt-3 px-2">
      <h3 className="mb-4" style={{ color: "#366000", fontWeight: "bold" }}>
        Dashboard Overview
      </h3>

      {/* Top row cards */}
      <div className="row g-3">
        <div className="col-md-2 col-6">
          <Card className="shadow-sm" style={cardStyle}>
            <CardBody className="d-flex flex-column justify-content-center align-items-center">
              <h6>Total Bookings</h6>
              <h4>{data.total_bookings}</h4>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-2 col-6">
          <Card className="shadow-sm" style={cardStyle}>
            <CardBody className="d-flex flex-column justify-content-center align-items-center">
              <h6>Confirmed Bookings</h6>
              <h4>{data.confirmed_bookings}</h4>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-2 col-6">
          <Card className="shadow-sm" style={cardStyle}>
            <CardBody className="d-flex flex-column justify-content-center align-items-center">
              <h6>Pending Bookings</h6>
              <h4>{data.pending_bookings}</h4>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3 col-6">
          <Card className="shadow-sm" style={cardStyle}>
            <CardBody className="d-flex flex-column justify-content-center align-items-center">
              <h6>Total Messages</h6>
              <h4>{data.messages}</h4>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3 col-6">
          <Card className="shadow-sm" style={cardStyle}>
            <CardBody className="d-flex flex-column justify-content-center align-items-center">
              <h6>Services</h6>
              <h4>{data.total_services}</h4>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Charts row */}
      <div className="row g-3 mt-2">
        <div className="col-md-6 col-12">
          <Card className="shadow-sm p-3" style={{ backgroundColor: "#e6f2e6", height: "350px" }}>
            <h5 style={{ color: "#366000" }}>Bookings by Month</h5>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </Card>
        </div>

        <div className="col-md-6 col-12">
          <Card className="shadow-sm p-3" style={{ backgroundColor: "#e6f2e6", height: "350px" }}>
            <h5 style={{ color: "#366000" }}>Bookings by Service</h5>
            <div style={{ height: "100%", width: "100%" }}>
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
