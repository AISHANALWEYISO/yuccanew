

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_BASE = `${API_BASE_URL}/api/v1/contact`;

const ContactDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [banner, setBanner] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Edit modal state
  const [showEdit, setShowEdit] = useState(false);
  const [editMessage, setEditMessage] = useState({});

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/all?search=${search}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBanner = async () => {
    try {
      const res = await axios.get(`${API_BASE}/banner`);
      setBanner(res.data.banner_url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchBanner();
  }, );

  const handleSearch = () => fetchMessages();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get(`${API_BASE}/export`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "contact_messages.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleBannerUpload = async () => {
    if (!selectedFile) return alert("Select a file first!");
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await axios.post(`${API_BASE}/banner/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBanner(res.data.image_url);
      alert("Banner uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload banner");
    }
  };

  // Open edit modal
  const handleEditClick = (msg) => {
    setEditMessage(msg);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    setEditMessage({ ...editMessage, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`${API_BASE}/${editMessage.id}`, editMessage);
      setShowEdit(false);
      fetchMessages();
    } catch (err) {
      console.error(err);
      alert("Failed to update message");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Contact Dashboard</h2>

      {/* Banner Section */}
      <div className="mb-4">
        <h4>Banner</h4>
        {banner && <img src={banner} alt="Banner" className="img-fluid mb-2" style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }} />}
        <InputGroup className="mb-2">
          <FormControl type="file" onChange={handleFileChange} />
          <Button variant="success" onClick={handleBannerUpload}>Upload Banner</Button>
        </InputGroup>
      </div>

      {/* Search and Export */}
      <div className="d-flex mb-3 gap-2">
        <Form.Control
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch} variant="primary">Search</Button>
        <Button onClick={handleExport} variant="secondary">Export CSV</Button>
      </div>

      {/* Messages Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>{msg.id}</td>
              <td>{msg.first_name}</td>
              <td>{msg.last_name}</td>
              <td>{msg.email}</td>
              <td>{msg.subject}</td>
              <td>{msg.message}</td>
              <td>{new Date(msg.created_at).toLocaleString()}</td>
              <td className="d-flex gap-2 justify-content-center">
                <Button variant="success" size="sm" onClick={() => handleEditClick(msg)}>
                  <FaEdit />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(msg.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
          {messages.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center">No messages found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="first_name" value={editMessage.first_name || ""} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="last_name" value={editMessage.last_name || ""} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={editMessage.email || ""} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" name="subject" value={editMessage.subject || ""} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} name="message" value={editMessage.message || ""} onChange={handleEditChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Close</Button>
          <Button variant="success" onClick={handleEditSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactDashboard;
