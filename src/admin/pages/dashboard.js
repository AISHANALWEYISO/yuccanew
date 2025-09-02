

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { getToken } from '../utils/auth';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL;
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
        const res = await axios.get(`${API_BASE_URL}/api/admin/dashboard`, {
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


