import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    password: '',
    user_type: 'user', // default user type
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Frontend validation for password length
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // Frontend validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Email is not valid');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/register', form);
      setMessage(response.data.message || 'User added successfully!');
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        password: '',
        user_type: 'user',
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to add user');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New User</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">User Type</label>
         
            {/* name="user_type"
            value={form.user_type}
            onChange={handleChange}
            className="form-control"
            required */}
          
            
            {/* <option value="staff">Staff</option> */}
          
        </div>

        <button className="btn btn-primary" type="submit">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaUserPlus, FaEnvelope, FaPhone, FaKey, FaUserTag } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AddUser = () => {
//   const [form, setForm] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     contact: '',
//     password: '',
//     user_type: 'admin',
//   });

//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(null);
//     setError(null);

//     if (form.password.length < 8) {
//       setError('Password must be at least 8 characters long.');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(form.email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/register', form);
//       setMessage(response.data.message || 'User registered successfully!');
//       setForm({
//         first_name: '',
//         last_name: '',
//         email: '',
//         contact: '',
//         password: '',
//         user_type: 'admin',
//       });
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError('Something went wrong. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="container mt-5 p-4 shadow rounded bg-light" style={{ maxWidth: '600px' }}>
//       <h3 className="text-center text-success mb-4"><FaUserPlus /> Register New User</h3>

//       {message && <div className="alert alert-success">{message}</div>}
//       {error && <div className="alert alert-danger">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">First Name</label>
//           <input
//             name="first_name"
//             value={form.first_name}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="e.g., Aisha"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Last Name</label>
//           <input
//             name="last_name"
//             value={form.last_name}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="e.g., Nalweyiso"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label"><FaEnvelope /> Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="e.g., farmer@example.com"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label"><FaPhone /> Contact</label>
//           <input
//             name="contact"
//             value={form.contact}
//             onChange={handleChange}
//             className="form-control"
//             placeholder=""
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label"><FaKey /> Password</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             className="form-control"
//             placeholder=""
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label"><FaUserTag /> User Type</label>
//           <select
//             name="user_type"
//             value={form.user_type}
//             onChange={handleChange}
//             className="form-select"
//           >
//             <option value="admin">Admin</option>
//             <option value="staff">Staff</option>
//           </select>
//         </div>

//         <button className="btn btn-success w-100" type="submit">
//           Register User
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddUser;
