import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaTrash, FaPen } from "react-icons/fa";
import { Modal, Button, Form, Table } from "react-bootstrap";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const API = `${API_BASE_URL}/api/v1/team`; // Flask backend

const TeamDashboard = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: null,
    twitter: "",
    linkedin: "",
  });

  const token = localStorage.getItem("token"); // JWT token

  // Fetch all team members (NO Authorization header to avoid preflight)
  const fetchTeam = useCallback(async () => {
    try {
      const res = await axios.get(API); // no headers
      setTeam(res.data);
    } catch (err) {
      console.error("Error fetching team:", err);
    }
  }, []);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setEditingMember(null);
    setFormData({ name: "", role: "", image: null, twitter: "", linkedin: "" });
    setShowModal(true);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      image: null,
      twitter: member.twitter,
      linkedin: member.linkedin,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeam((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      if (formData.name) data.append("name", formData.name);
      if (formData.role) data.append("role", formData.role);
      if (formData.twitter) data.append("twitter", formData.twitter);
      if (formData.linkedin) data.append("linkedin", formData.linkedin);
      if (formData.image instanceof File) data.append("image", formData.image);

      if (editingMember) {
        await axios.put(`${API}/${editingMember.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API}/create`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      await fetchTeam();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving member:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 style={{ color: "#366000" }}>Team Management</h2>

      <Button
        style={{ backgroundColor: "#366000", borderColor: "#366000", marginBottom: "15px" }}
        onClick={handleAdd}
      >
        Add Member
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Image</th>
            <th>X (Twitter)</th>
            <th>LinkedIn</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {team.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>
                {member.image && (
                  <img
                    src={`${API_BASE_URL}${member.image}`}
                    alt={member.name}
                    style={{ width: "60px", borderRadius: "50%" }}
                  />
                )}
              </td>
              <td>{member.twitter}</td>
              <td>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    Profile
                  </a>
                )}
              </td>
              <td>
                <FaPen
                  style={{ cursor: "pointer", color: "#366000", marginRight: "10px" }}
                  onClick={() => handleEdit(member)}
                />
                <FaTrash
                  style={{ cursor: "pointer", color: "#dc3545" }}
                  onClick={() => handleDelete(member.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingMember ? "Edit Member" : "Add Member"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>X (Twitter)</Form.Label>
              <Form.Control type="text" name="twitter" value={formData.twitter} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button type="submit" style={{ backgroundColor: "#366000", borderColor: "#366000" }} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamDashboard;

