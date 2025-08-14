import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Image,
} from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getToken } from '../utils/auth';
import '../../styles/adminservices.css'; // Your theme CSS

const ServiceDashboard = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
 
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch services from backend
  const fetchServices = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:5000/api/v1/services/');
      // Assuming backend sends { services: [...] }
      setServices(res.data.services || res.data || []);
    } catch (err) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price,
      
        image: null, // leave null, only change if upload new image
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        price: '',
     
        image: null,
      });
    }
    setError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const authHeaders = {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'multipart/form-data',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') data.append(key, value);
    });

    try {
      if (editingService) {
        await axios.put(
          `http://localhost:5000/api/v1/services/edit/${editingService.id}`,
          data,
          { headers: authHeaders }
        );
      } else {
        await axios.post('http://localhost:5000/api/v1/services/create', data, {
          headers: authHeaders,
        });
      }
      fetchServices();
      closeModal();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Failed to save service. Check your input and try again.'
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    setError('');
    try {
      await axios.delete(`http://localhost:5000/api/v1/services/delete/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchServices();
    } catch {
      setError('Failed to delete service');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-theme mb-4">Services Management</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button className="btn-theme mb-3" onClick={() => openModal()}>
        <FaPlus /> Add New Service
      </Button>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <Table bordered hover responsive className="align-middle">
          <thead className="table-theme">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price (shs)</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id || service.service_id}>
                <td>{service.id || service.service_id}</td>
                <td>
                  {service.image ? (
                    <Image
                      src={`http://localhost:5000/${service.image}`}
                      alt={service.name}
                      rounded
                      style={{ width: 60, height: 60, objectFit: 'cover' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
               
                <td>
                  <Button
                    variant="outline-theme"
                    className="me-2"
                    title="Edit"
                    onClick={() => openModal(service)}
                    style={{ borderColor: '#006400', color: '#006400' }} // example theme green
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    title="Delete"
                    onClick={() => handleDelete(service.id || service.service_id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={closeModal} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingService ? 'Edit Service' : 'Add New Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="serviceName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="serviceDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="servicePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="serviceImage" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleInputChange} />
              {editingService && !formData.image && (
                <small className="text-muted">
                  Current image will remain if no new file is chosen.
                </small>
              )}
            </Form.Group>

            <Button type="submit" className="btn-theme">
              {editingService ? 'Update Service' : 'Create Service'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ServiceDashboard;
