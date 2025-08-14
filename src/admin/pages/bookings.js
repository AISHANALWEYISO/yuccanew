import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaCheck, FaTimes, FaTrash, FaEdit, FaDownload } from 'react-icons/fa';
import { getToken } from '../utils/auth';

const API_BASE_URL = 'http://127.0.0.1:5000';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const fetchBookings = async (page = 1, limit = 50) => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await axios.get(`${API_BASE_URL}/api/v1/bookings/?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data.bookings);
    } catch (err) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const downloadBookingsCSV = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}/api/v1/bookings/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bookings.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) { alert('Failed to download bookings CSV.'); }
  };

  const handleStatusChange = (booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setShowModal(true);
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/v1/bookings/edit/${selectedBooking.id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setShowModal(false);
      fetchBookings();
    } catch { alert('Failed to update status.'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/v1/bookings/delete/${id}`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      fetchBookings();
    } catch { alert('Failed to delete booking.'); }
  };

  const renderStatusBadge = (status) => {
    const map = { pending: 'warning', confirmed: 'info', completed: 'success' };
    return <Badge bg={map[status] || 'secondary'}>{status}</Badge>;
  };

  // --- Theme color
  const themeColor = '#366000';

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Bookings</h2>
      <div className="d-flex justify-content-between mb-3">
        <Button
          style={{ borderColor: themeColor, color: themeColor, backgroundColor: 'transparent' }}
          onClick={downloadBookingsCSV}
        >
          <FaDownload /> Download Bookings
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? <Spinner animation="border" /> :
        bookings.length === 0 ? <p>No bookings found.</p> :
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Service</th>
              <th>Status</th>
              <th>Verified</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b.id}>
                <td>{i + 1}</td>
                <td>{b.user.name}<br/><small>{b.user.email || b.user.contact}</small></td>
                <td>{b.service.name}</td>
                <td>{renderStatusBadge(b.status)}</td>
                <td>{b.is_verified ? <FaCheck className="text-success" /> : <FaTimes className="text-danger" />}</td>
                <td>{b.preferred_date}</td>
                <td>
                  <Button
                    style={{ borderColor: themeColor, color: themeColor, backgroundColor: 'transparent' }}
                    size="sm"
                    onClick={() => handleStatusChange(b)}
                    className="me-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(b.id)}><FaTrash /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Update Booking Status</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select value={newStatus} onChange={e => setNewStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleUpdateStatus}><FaCheck /> Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminBookings;
