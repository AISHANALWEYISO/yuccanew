


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaPen, FaTrash } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_BASE = `${API_BASE_URL}/api/v1`; // Flask backend URL

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [page] = useState(1);
  const [limit] = useState(50);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [formData, setFormData] = useState({
    guest_name: "",
    guest_contact: "",
    status: "",
    preferred_date: "",
  });

  const token = localStorage.getItem("token");

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = { page, limit };
      if (statusFilter) params.status = statusFilter;
      if (dateFilter) params.date = dateFilter;

      const res = await axios.get(`${API_BASE}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setBookings(res.data.bookings);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, dateFilter]);

  const handleEdit = (booking) => {
    setCurrentBooking(booking);
    setFormData({
      guest_name: booking.guest_name,
      guest_contact: booking.guest_contact,
      status: booking.status,
      preferred_date: booking.preferred_date,
    });
    setShowEdit(true);
  };

  const handleClose = () => setShowEdit(false);

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE}/bookings/${currentBooking.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking updated successfully");
      fetchBookings();
      setShowEdit(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`${API_BASE}/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking deleted successfully");
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete booking");
    }
  };

  const clearFilters = () => {
    setStatusFilter("");
    setDateFilter("");
  };

  const handleDownload = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (dateFilter) params.date = dateFilter;

      const res = await axios.get(`${API_BASE}/bookings/download`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bookings.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      toast.error("Failed to download CSV");
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="my-3">Bookings Management</h3>

      {/* Filters & Actions */}
      <div className="d-flex flex-wrap align-items-center mb-3 gap-2">
        <Form.Control
          type="text"
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: "200px" }}
        />
        <Form.Control
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{ maxWidth: "200px" }}
        />
        <Button variant="secondary" onClick={clearFilters}>
          Clear
        </Button>
        <Button
          style={{ backgroundColor: "#366000", borderColor: "#366000" }}
          onClick={handleDownload}
        >
          Download Bookings
        </Button>
      </div>

      {/* Bookings Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center">
                Loading...
              </td>
            </tr>
          ) : bookings.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.guest_name}</td>
                <td>{b.guest_contact}</td>
                <td>{b.service?.name || "-"}</td>
                <td>{b.preferred_date}</td>
                <td>{b.status}</td>
                <td>{b.is_verified ? "Yes" : "No"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="link"
                    className="p-0 me-2"
                    style={{ color: "#366000" }}
                    onClick={() => handleEdit(b)}
                  >
                    <FaPen />
                  </Button>
                  <Button
                    size="sm"
                    variant="link"
                    className="p-0 text-danger"
                    onClick={() => handleDelete(b.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.guest_name}
                onChange={(e) =>
                  setFormData({ ...formData, guest_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={formData.guest_contact}
                onChange={(e) =>
                  setFormData({ ...formData, guest_contact: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Preferred Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.preferred_date}
                onChange={(e) =>
                  setFormData({ ...formData, preferred_date: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingDashboard;
