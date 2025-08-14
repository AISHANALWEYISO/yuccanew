import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState(null);
  const [formData, setFormData] = useState({ name: '', location: '', crops_grown: '' });

  const API_BASE = 'http://127.0.0.1:5000/api/v1/farmers';
  const token = localStorage.getItem('token');

 const headers = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
};


  // Load all farmers
  const fetchFarmers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/`);
      setFarmers(response.data.farmers);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const handleShowModal = (farmer = null) => {
    if (farmer) {
      setEditingFarmer(farmer);
      setFormData({ name: farmer.name, location: farmer.location, crops_grown: farmer.crops_grown });
    } else {
      setEditingFarmer(null);
      setFormData({ name: '', location: '', crops_grown: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFarmer) {
        await axios.put(`${API_BASE}/edit/${editingFarmer.id}`, formData, headers);
      } else {
        await axios.post(`${API_BASE}/create`, formData, headers);
      }
      handleCloseModal();
      fetchFarmers();
    } catch (error) {
      alert('Failed to submit: ' + error.response?.data?.error || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this farmer?')) return;
    try {
      await axios.delete(`${API_BASE}/delete/${id}`, headers);
      fetchFarmers();
    } catch (error) {
      alert('Failed to delete: ' + error.response?.data?.error || error.message);
    }
  };                               

  return (
    <div className="p-4">
      <h2 className="mb-1">Manage Farmers</h2>
      <Button variant="success" className="mb-3" onClick={() => handleShowModal()}>
        <FaPlus /> Add Farmer
      </Button>

      <Table striped bordered hover>                                                                                      
        <thead>
          <tr>
            <th>ID</th>                                                
            <th>Name</th>
            <th>Location</th>
            <th>Crops Grown</th>                                         
            <th>Actions</th>                                                                                                                                         
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer, index) => (
            <tr key={farmer.id}>
              <td>{index + 1}</td>
              <td>{farmer.name}</td>
              <td>{farmer.location}</td>
              <td>{farmer.crops_grown}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(farmer)}>
                  <FaEdit />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(farmer.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingFarmer ? 'Edit Farmer' : 'Add Farmer'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="formName" className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formLocation" className="mb-2">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formCrops" className="mb-2">
              <Form.Label>Crops Grown</Form.Label>
              <Form.Control type="text" name="crops_grown" value={formData.crops_grown} onChange={handleChange} required />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="primary" type="submit">{editingFarmer ? 'Update' : 'Create'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Farmers;
