

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Modal, Button, Form, Table, Card, Row, Col } from "react-bootstrap";

const API_BASE_URL = process.env.REACT_APP_API_URL;
// Axios instance with JWT
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/footer`,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function FooterDashboard() {
  const [footers, setFooters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    link_name: "",
    link_url: "",
    email: "",
    phone: "",
    address: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });

  // Fetch all footers
  const fetchFooters = async () => {
    try {
      const res = await api.get("/");
      setFooters(res.data);
    } catch (err) {
      console.error("Error fetching footers:", err);
    }
  };

  useEffect(() => {
    fetchFooters();
  }, []);

  // Memoize contactFooter so it doesn't change on every render
  const contactFooter = useMemo(
    () => footers.find((f) => f.email || f.phone || f.address) || {},
    [footers]
  );

  // Initialize Contact/Social form when footers load
  useEffect(() => {
    if (contactFooter) {
      setForm((prev) => ({
        ...prev,
        email: contactFooter.email || "",
        phone: contactFooter.phone || "",
        address: contactFooter.address || "",
        facebook: contactFooter.facebook || "",
        twitter: contactFooter.twitter || "",
        linkedin: contactFooter.linkedin || "",
        instagram: contactFooter.instagram || "",
      }));
    }
  }, [contactFooter]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open modal for Add/Edit Quick Link
  const handleOpen = (footer = null) => {
    setEditing(footer);
    setForm(
      footer || {
        link_name: "",
        link_url: "",
        email: "",
        phone: "",
        address: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
      }
    );
    setShowModal(true);
  };

  // Save Quick Link
  const handleSaveLink = async () => {
    try {
      if (!form.link_name || !form.link_url) {
        alert("Link Name and URL are required");
        return;
      }
      if (editing && editing.id) {
        await api.put(`/${editing.id}`, {
          link_name: form.link_name,
          link_url: form.link_url,
        });
      } else {
        await api.post("/", {
          link_name: form.link_name,
          link_url: form.link_url,
        });
      }
      setShowModal(false);
      fetchFooters();
    } catch (err) {
      console.error("Error saving link:", err);
      alert("Failed to save link");
    }
  };

  // Delete Quick Link
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;
    try {
      await api.delete(`/${id}`);
      fetchFooters();
    } catch (err) {
      console.error("Error deleting link:", err);
      alert("Failed to delete link");
    }
  };

  // Save Contact/Social
  const handleSaveContact = async () => {
    if (!contactFooter || !contactFooter.id) return;
    try {
      await api.put(`/${contactFooter.id}`, form);
      fetchFooters();
      alert("Contact/Social updated successfully");
    } catch (err) {
      console.error("Error saving contact/social:", err);
      alert("Failed to save contact/social");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Footer Management</h3>
      <Row>
        {/* Quick Links */}
        <Col md={7}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Quick Links</span>
              <Button size="sm" onClick={() => handleOpen()}>Add Link</Button>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Link Name</th>
                    <th>URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {footers.filter(f => f.link_name && f.link_url).map((footer, i) => (
                    <tr key={footer.id}>
                      <td>{i + 1}</td>
                      <td>{footer.link_name}</td>
                      <td>{footer.link_url}</td>
                      <td>
                        <Button size="sm" variant="warning" onClick={() => handleOpen(footer)}>Edit</Button>{" "}
                        <Button size="sm" variant="danger" onClick={() => handleDelete(footer.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact & Social */}
        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Header>Contact & Social</Card.Header>
            <Card.Body>
              <Form>
                {["email","phone","address","facebook","twitter","linkedin","instagram"].map((field) => (
                  <Form.Group key={field} className="mb-2">
                    <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                    <Form.Control
                      name={field}
                      value={form[field] || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                ))}
                <Button variant="success" onClick={handleSaveContact}>
                  Save Contact/Social
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Link Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Edit Link" : "Add Link"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Link Name</Form.Label>
              <Form.Control
                name="link_name"
                value={form.link_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Link URL</Form.Label>
              <Form.Control
                name="link_url"
                value={form.link_url}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveLink}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
