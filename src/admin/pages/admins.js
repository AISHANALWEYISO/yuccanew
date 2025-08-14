import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getToken } from '../utils/auth';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    password: '',
  });

  const token = getToken();

  const headers = useMemo(() => ({
    Authorization: `Bearer ${token}`,
  }), [token]);

  const fetchAdmins = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/admin/all', { headers });
      setAdmins(response.data.admins || []);
    } catch (error) {
      console.error('Fetch failed:', error.response || error);
    }
  }, [headers]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // Open modal for create or edit
  const openModal = (admin = null) => {
    if (admin) {
      setEditingAdminId(admin.id);
      setFormData({
        first_name: admin.first_name,
        last_name: admin.last_name,
        email: admin.email,
        contact: admin.contact,
        password: '', // leave blank unless changing
      });
    } else {
      setEditingAdminId(null);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        password: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAdminId(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      contact: '',
      password: '',
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Create or update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAdminId) {
        // Update admin
        // Password optional on update
        const dataToSend = { ...formData };
        if (!formData.password) delete dataToSend.password; // Remove password if empty

        await axios.put(`http://localhost:5000/api/v1/admin/update/${editingAdminId}`, dataToSend, { headers });
        alert('Admin updated successfully!');
      } else {
        // Create admin (password required)
        await axios.post('http://localhost:5000/api/v1/admin/create', formData, { headers });
        alert('Admin created successfully!');
      }
      closeModal();
      fetchAdmins();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to save admin');
    }
  };

  // Delete admin
  const deleteAdmin = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/v1/admin/delete/${id}`, { headers });
      alert('Admin deleted successfully!');
      fetchAdmins();
    } catch (error) {
      alert(error.response?.data?.error || 'Delete failed');
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: '#366000' }}>Manage Admins</h3>
        <Button
          onClick={() => openModal()}
          style={{ backgroundColor: '#366000', borderColor: '#366000' }}
        >
          <FaPlus className="me-2" /> Create Admin
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: '#366000', color: 'white' }}>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">No admins found.</td>
            </tr>
          )}
          {admins.map((admin, index) => (
            <tr key={admin.id || index}>
              <td>{index + 1}</td>
              <td>{admin.first_name}</td>
              <td>{admin.last_name}</td>
              <td>{admin.email}</td>
              <td>{admin.contact}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => openModal(admin)}
                  style={{ backgroundColor: '#366000', border: 'none', marginRight: '0.5rem' }}
                  title="Edit Admin"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteAdmin(admin.id)}
                  style={{ border: 'none' }}
                  title="Delete Admin"
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Create/Edit */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#366000', color: 'white' }}>
          <Modal.Title>{editingAdminId ? 'Edit Admin' : 'Create Admin'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={!!editingAdminId} // Disable email editing when editing
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{editingAdminId ? 'New Password (leave blank to keep current)' : 'Password'}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!editingAdminId}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal} style={{ border: 'none' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: '#366000', borderColor: '#366000' }}
            >
              {editingAdminId ? 'Update Admin' : 'Create Admin'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageAdmins;
