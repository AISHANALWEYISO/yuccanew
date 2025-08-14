import React, { useEffect, useState } from "react";
import { Card, CardBody } from "react-bootstrap";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Overview = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/v1/dashboard/overview", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Error fetching overview data:", err);
      }
    };

    fetchOverviewData();
  }, []);

  if (!data) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  // Bar chart for bookings per month
  const chartData = {
    labels: data.monthly_bookings.map((b) => b.month),
    datasets: [
      {
        label: "Bookings per Month",
        data: data.monthly_bookings.map((b) => b.count),
        backgroundColor: "#366000",
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4" style={{ color: "#366000" }}>
        Dashboard Overview
      </h3>

      <div className="row mb-4">
        <div className="col-md-3">
          <Card className="shadow-sm">
            <CardBody>
              <h5>Total Bookings</h5>
              <h3>{data.total_bookings}</h3>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card className="shadow-sm">
            <CardBody>
              <h5>Confirmed Bookings</h5>
              <h3>{data.Confirmed_bookings}</h3>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card className="shadow-sm">
            <CardBody>
              <h5>Total Users</h5>
              <h3>{data.total_users}</h3>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card className="shadow-sm">
            <CardBody>
              <h5>Total Admins</h5>
              <h3>{data.total_admins}</h3>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <Card className="shadow-sm">
            <CardBody>
              <h5>Services</h5>
              <h3>{data.total_services}</h3>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card className="shadow-sm">
            <CardBody>
              <h5>Feedbacks</h5>
              <h3>{data.feedbacks}</h3>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card className="shadow-sm">
            <CardBody>
              <h5>Messages</h5>
              <h3>{data.messages}</h3>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3">
          <Card className="shadow-sm">
            <CardBody>
              <h5>Pending Bookings</h5>
              <h3>{data.pending_bookings}</h3>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="card shadow-sm p-4">
        <h5 style={{ color: "#366000" }}>Bookings by Month</h5>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Overview;