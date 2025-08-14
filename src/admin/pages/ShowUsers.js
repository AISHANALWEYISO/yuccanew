import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    user_type: '',
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://127.0.0.1:5000/api/v1/users/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error('Failed to fetch users', err);
      setError('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      contact: user.contact,
      user_type: user.type,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://127.0.0.1:5000/api/v1/users/edit/${editingUser.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowModal(false);
      setEditingUser(null);
      setMessage("User updated successfully!");
      fetchUsers();
    } catch (err) {
      console.error('Failed to update user', err);
      setError('Failed to update user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:5000/api/v1/users/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('User deleted successfully!');
      fetchUsers();
    } catch (err) {
      console.error('Failed to delete user', err);
      setError('Failed to delete user');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">User Management</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>User Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">No users found</td>
            </tr>
          )}
          {users.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td>{u.first_name} {u.last_name}</td>
              <td>{u.email}</td>
              <td>{u.contact}</td>
              <td>{u.type}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(u)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(u.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                value={formData.first_name} 
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="lastName" className="mt-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text" 
                value={formData.last_name} 
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="email" className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="contact" className="mt-2">
              <Form.Label>Contact</Form.Label>
              <Form.Control 
                type="text" 
                value={formData.contact} 
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="userType" className="mt-2">
              <Form.Label>User Type</Form.Label>
              <Form.Control 
                as="select"
                value={formData.user_type} 
                onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
              >
                <option value="">Select type</option>
                <option value="admin">Admin</option>
                <option value="farmer">Farmer</option>
                <option value="staff">Staff</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowUsers;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Spinner, Alert } from 'react-bootstrap';
// import { getToken } from '../utils/auth';

// const ShowUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/v1/users/', {
//           headers: {
//             Authorization: `Bearer ${getToken()}`
//           }
//         });
//         setUsers(res.data.users);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.error || 'Failed to fetch users');
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h3>All Users</h3>
//       {loading && <Spinner animation="border" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {!loading && users.length === 0 && <p>No users found.</p>}
//       {!loading && users.length > 0 && (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Full Name</th>
//               <th>Email</th>
//               <th>Contact</th>
//               <th>User Type</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user.id}>
//                 <td>{index + 1}</td>
//                 <td>{user.first_name} {user.last_name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.contact}</td>
//                 <td>{user.type}</td>
//                 <td>{new Date(user.created_at).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default ShowUsers;
