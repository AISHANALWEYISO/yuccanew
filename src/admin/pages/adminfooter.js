import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Table, Card, Row, Col } from "react-bootstrap";

// Axios instance that attaches JWT automatically if available
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/footer",
});

// Add JWT token from localStorage if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
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

  // Fetch all footer records
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

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open modal for new or edit
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

  // Save footer (add or update)
  const handleSave = async () => {
    try {
      if (editing) {
        await api.put(`/${editing.id}`, form);
      } else {
        await api.post("/", form);
      }
      setShowModal(false);
      fetchFooters();
    } catch (err) {
      console.error("Error saving footer:", err);
      alert("Failed to save footer. Check console for details.");
    }
  };

  // Delete footer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await api.delete(`/${id}`);
      fetchFooters();
    } catch (err) {
      console.error("Error deleting footer:", err);
      alert("Failed to delete footer. Check console for details.");
    }
  };

  // Pick the contact/social record (first row with email/phone)
  const contactFooter = footers.find((f) => f.email || f.phone || f.address);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Footer Management</h3>
      <Row>
        {/* Quick Links Section */}
        <Col md={7}>
          <Card className="mb-4 shadow-sm">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <span>Quick Links</span>
                <Button size="sm" onClick={() => handleOpen()}>
                  Add Link
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Link Name</th>
                    <th>URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {footers
                    .filter((f) => f.link_name && f.link_url)
                    .map((footer, i) => (
                      <tr key={footer.id}>
                        <td>{i + 1}</td>
                        <td>{footer.link_name}</td>
                        <td>{footer.link_url}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="warning"
                            onClick={() => handleOpen(footer)}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(footer.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact & Social Section */}
        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Header>Contact & Social</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={form.email || contactFooter?.email || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    value={form.phone || contactFooter?.phone || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    value={form.address || contactFooter?.address || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control
                    name="facebook"
                    value={form.facebook || contactFooter?.facebook || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control
                    name="twitter"
                    value={form.twitter || contactFooter?.twitter || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>LinkedIn</Form.Label>
                  <Form.Control
                    name="linkedin"
                    value={form.linkedin || contactFooter?.linkedin || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control
                    name="instagram"
                    value={form.instagram || contactFooter?.instagram || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="success" onClick={handleSave}>
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
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
                value={form.link_name || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Link URL</Form.Label>
              <Form.Control
                name="link_url"
                value={form.link_url || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
