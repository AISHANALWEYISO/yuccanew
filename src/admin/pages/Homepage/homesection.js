// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SectionManager = () => {
//   const [sections, setSections] = useState([]);
//   const [newSection, setNewSection] = useState({ title: '', description: '', order: '' });
//   const [message, setMessage] = useState('');

//   const API_URL = 'http://localhost:5000/api/v1/homepage/sections';

//   useEffect(() => {
//     fetchSections();
//   }, []);

//   const fetchSections = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setSections(res.data);
//     } catch {
//       setMessage('Failed to load sections.');
//     }
//   };

//   const handleAdd = async () => {
//     try {
//       await axios.post(API_URL, newSection);
//       setNewSection({ title: '', description: '', order: '' });
//       setMessage('Section added!');
//       fetchSections();
//     } catch {
//       setMessage('Error adding section.');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchSections();
//     } catch {
//       setMessage('Failed to delete section.');
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Sections</h2>

//       <input
//         type="text"
//         placeholder="Title"
//         value={newSection.title}
//         onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
//       />
//       <textarea
//         placeholder="Description"
//         value={newSection.description}
//         onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
//       />
//       <input
//         type="number"
//         placeholder="Order"
//         value={newSection.order}
//         onChange={(e) => setNewSection({ ...newSection, order: e.target.value })}
//       />
//       <button onClick={handleAdd}>Add Section</button>

//       {sections.map((sec) => (
//         <div key={sec.id} style={{ marginTop: '1rem' }}>
//           <h4>{sec.title} (#{sec.order})</h4>
//           <p>{sec.description}</p>
//           <button onClick={() => handleDelete(sec.id)}>Delete</button>
//         </div>
//       ))}

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default SectionManager;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Sections = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [newSection, setNewSection] = useState({ title: "", content: "" });

  const token = localStorage.getItem("token");

  // Fetch all sections
  const fetchSections = () => {
    setLoading(true);
    setError("");
    axios
      .get("/api/v1/homepage/sections")
      .then((res) => {
        setSections(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load sections");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // Handle edit form changes
  const handleEditChange = (id, e) => {
    const { name, value } = e.target;
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === id ? { ...sec, [name]: value } : sec
      )
    );
  };

  // Save edits
  const saveEdit = (id) => {
    const section = sections.find((s) => s.id === id);
    axios
      .put(`/api/v1/homepage/sections/${id}`, {
        title: section.title,
        content: section.content,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Section updated");
        setEditingSectionId(null);
      })
      .catch(() => alert("Failed to update section"));
  };

  // Delete section
  const deleteSection = (id) => {
    if (!window.confirm("Are you sure you want to delete this section?")) return;
    axios
      .delete(`/api/v1/homepage/sections/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Section deleted");
        fetchSections();
      })
      .catch(() => alert("Failed to delete section"));
  };

  // Handle new section input
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewSection((prev) => ({ ...prev, [name]: value }));
  };

  // Add new section
  const addSection = () => {
    if (!newSection.title.trim() || !newSection.content.trim()) {
      alert("Please fill title and content");
      return;
    }
    axios
      .post("/api/v1/homepage/sections", newSection, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Section added");
        setNewSection({ title: "", content: "" });
        fetchSections();
      })
      .catch(() => alert("Failed to add section"));
  };

  if (loading) return <p>Loading sections...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Homepage Sections</h2>

      {/* Add New Section */}
      <div style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
        <h3>Add New Section</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newSection.title}
          onChange={handleNewChange}
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newSection.content}
          onChange={handleNewChange}
          rows={4}
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
        <button onClick={addSection}>Add Section</button>
      </div>

      {/* Existing Sections */}
      {sections.length === 0 && <p>No sections found.</p>}
      {sections.map((sec) => (
        <div
          key={sec.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "1rem",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          {editingSectionId === sec.id ? (
            <>
              <input
                type="text"
                name="title"
                value={sec.title}
                onChange={(e) => handleEditChange(sec.id, e)}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />
              <textarea
                name="content"
                value={sec.content}
                onChange={(e) => handleEditChange(sec.id, e)}
                rows={4}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />
              <button onClick={() => saveEdit(sec.id)}>Save</button>{" "}
              <button onClick={() => setEditingSectionId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h4>{sec.title}</h4>
              <p>{sec.content}</p>
              <button onClick={() => setEditingSectionId(sec.id)}>Edit</button>{" "}
              <button onClick={() => deleteSection(sec.id)} style={{ color: "red" }}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sections;
