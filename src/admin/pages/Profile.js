import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getToken } from '../utils/auth'; // Token helper

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        const response = await axios.get('http://127.0.0.1:5000/api/v1/admin/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmin(response.data.admin);
      } catch (err) {
        console.error(err);
        setError('Unauthorized or failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Admin Profile</h3>
              <p><strong>Name:</strong> {admin.first_name} {admin.last_name}</p>
              <p><strong>Email:</strong> {admin.email}</p>
              <p><strong>Contact:</strong> {admin.contact}</p>
              <p><strong>Role:</strong> {admin.user_type}</p>
              <p><strong>Created At:</strong> {new Date(admin.created_at).toLocaleString()}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProfile;
