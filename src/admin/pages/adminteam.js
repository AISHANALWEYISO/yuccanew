import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaTrash, FaPen } from "react-icons/fa";
import { Modal, Button, Form, Table } from "react-bootstrap";

const API = "http://localhost:5000/api/v1/team"; // Flask backend

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
                    src={`http://localhost:5000${member.image}`}
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Modal, Button, Form, Table } from "react-bootstrap";

// const API_URL = "http://127.0.0.1:5000/api/v1/team";

// const TeamManagement = ({ token }) => {
//   const [team, setTeam] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editMember, setEditMember] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     twitter: "",
//     linkedin: "",
//     image: null,
//   });

//   // Fetch all members
//   const fetchTeam = async () => {
//     try {
//       const res = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeam(res.data);
//     } catch (err) {
//       console.error("Error fetching team:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTeam();
//   }, );

//   // Handle form changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Open modal (for add or edit)
//   const handleShow = (member = null) => {
//     setEditMember(member);
//     if (member) {
//       setFormData({
//         name: member.name,
//         role: member.role,
//         twitter: member.twitter,
//         linkedin: member.linkedin,
//         image: null,
//       });
//     } else {
//       setFormData({ name: "", role: "", twitter: "", linkedin: "", image: null });
//     }
//     setShowModal(true);
//   };

//   const handleClose = () => setShowModal(false);

//   // Submit form (create or update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     for (let key in formData) {
//       if (formData[key]) data.append(key, formData[key]);
//     }

//     try {
//       if (editMember) {
//         // Update
//         await axios.put(`${API_URL}/${editMember.id}`, data, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         // Create
//         await axios.post(`${API_URL}/create`, data, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }
//       fetchTeam();
//       handleClose();
//     } catch (err) {
//       console.error("Error saving member:", err);
//     }
//   };

//   // Delete member
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this member?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTeam();
//     } catch (err) {
//       console.error("Error deleting member:", err);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-3">Team Management</h2>
//       <Button variant="success" onClick={() => handleShow()}>
//         ➕ Add Member
//       </Button>

//       <Table striped bordered hover responsive className="mt-3">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Photo</th>
//             <th>Name</th>
//             <th>Role</th>
//             <th>Twitter</th>
//             <th>LinkedIn</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {team.map((member, index) => (
//             <tr key={member.id}>
//               <td>{index + 1}</td>
//               <td>
//                 {member.image ? (
//                   <img
//                     src={`http://127.0.0.1:5000${member.image}`}
//                     alt={member.name}
//                     width="50"
//                     height="50"
//                     style={{ borderRadius: "50%" }}
//                   />
//                 ) : (
//                   "No Image"
//                 )}
//               </td>
//               <td>{member.name}</td>
//               <td>{member.role}</td>
//               <td>
//                 <a href={member.twitter} target="_blank" rel="noreferrer">
//                   {member.twitter}
//                 </a>
//               </td>
//               <td>
//                 <a href={member.linkedin} target="_blank" rel="noreferrer">
//                   {member.linkedin}
//                 </a>
//               </td>
//               <td>
//                 <Button
//                   style={{ backgroundColor: "#366000", borderColor: "#366000" }}
//                   size="sm"
//                   className="me-2"
//                   onClick={() => handleShow(member)}
//                 >
//                   ✏️ Edit
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => handleDelete(member.id)}
//                 >
//                   🗑️ Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal for Add/Edit */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editMember ? "Edit Member" : "Add Member"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Role</Form.Label>
//               <Form.Control
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Twitter</Form.Label>
//               <Form.Control
//                 name="twitter"
//                 value={formData.twitter}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>LinkedIn</Form.Label>
//               <Form.Control
//                 name="linkedin"
//                 value={formData.linkedin}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="image"
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Button
//               type="submit"
//               style={{ backgroundColor: "#366000", borderColor: "#366000" }}
//             >
//               {editMember ? "Update" : "Save"}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default TeamManagement;
