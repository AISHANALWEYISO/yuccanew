// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MediaManager = () => {
//   const [media, setMedia] = useState([]);
//   const [file, setFile] = useState(null);
//   const [type, setType] = useState('image');
//   const [caption, setCaption] = useState('');
//   const [message, setMessage] = useState('');

//   const API_URL = 'http://localhost:5000/api/v1/homepage/media';

//   const fetchMedia = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setMedia(res.data);
//     } catch {
//       setMessage('Failed to fetch media.');
//     }
//   };

//   useEffect(() => {
//     fetchMedia();
//   }, []);

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('media_file', file);
//     formData.append('type', type);
//     formData.append('caption', caption);

//     try {
//       await axios.post(API_URL, formData);
//       setMessage('Uploaded successfully!');
//       fetchMedia();
//     } catch {
//       setMessage('Failed to upload.');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchMedia();
//     } catch {
//       setMessage('Error deleting media.');
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Media</h2>

//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <select value={type} onChange={(e) => setType(e.target.value)}>
//         <option value="image">Image</option>
//         <option value="video">Video</option>
//       </select>
//       <input
//         type="text"
//         placeholder="Caption"
//         value={caption}
//         onChange={(e) => setCaption(e.target.value)}
//       />
//       <button onClick={handleUpload}>Upload</button>

//       <div style={{ marginTop: '1rem' }}>
//         {media.map((item) => (
//           <div key={item.id}>
//             <p>{item.caption}</p>
//             {item.type === 'image' ? (
//               <img src={`http://localhost:5000/uploads/${item.filename}`} alt={item.caption} width="150" />
//             ) : (
//               <video width="200" controls>
//                 <source src={`http://localhost:5000/uploads/${item.filename}`} type="video/mp4" />
//               </video>
//             )}
//             <button onClick={() => handleDelete(item.id)}>Delete</button>
//           </div>
//         ))}
//       </div>

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default MediaManager;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Media = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newMedia, setNewMedia] = useState({ image_url: "", caption: "" });

  const token = localStorage.getItem("token");

  const fetchMedia = () => {
    setLoading(true);
    setError("");
    axios
      .get("/api/v1/homepage/media")
      .then((res) => {
        setMediaItems(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load media");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleEditChange = (id, e) => {
    const { name, value } = e.target;
    setMediaItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [name]: value } : m))
    );
  };

  const saveEdit = (id) => {
    const media = mediaItems.find((m) => m.id === id);
    if (!media.image_url.trim()) {
      alert("Image URL cannot be empty");
      return;
    }
    axios
      .put(`/api/v1/homepage/media/${id}`, media, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Media updated");
        setEditingId(null);
      })
      .catch(() => alert("Failed to update media"));
  };

  const deleteMedia = (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    axios
      .delete(`/api/v1/homepage/media/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Media deleted");
        fetchMedia();
      })
      .catch(() => alert("Failed to delete media"));
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewMedia((prev) => ({ ...prev, [name]: value }));
  };

  const addMedia = () => {
    if (!newMedia.image_url.trim()) {
      alert("Image URL is required");
      return;
    }
    axios
      .post("/api/v1/homepage/media", newMedia, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Media added");
        setNewMedia({ image_url: "", caption: "" });
        fetchMedia();
      })
      .catch(() => alert("Failed to add media"));
  };

  if (loading) return <p>Loading media...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Homepage Media</h2>

      {/* Add new media */}
      <div style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
        <h3>Add New Media</h3>
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={newMedia.image_url}
          onChange={handleNewChange}
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
        <input
          type="text"
          name="caption"
          placeholder="Caption (optional)"
          value={newMedia.caption}
          onChange={handleNewChange}
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
        <button onClick={addMedia}>Add Media</button>
      </div>

      {/* List existing media */}
      {mediaItems.length === 0 && <p>No media found.</p>}
      {mediaItems.map((m) => (
        <div
          key={m.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "1rem",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          {editingId === m.id ? (
            <>
              <input
                type="text"
                name="image_url"
                value={m.image_url}
                onChange={(e) => handleEditChange(m.id, e)}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />
              <input
                type="text"
                name="caption"
                value={m.caption || ""}
                onChange={(e) => handleEditChange(m.id, e)}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />
              <button onClick={() => saveEdit(m.id)}>Save</button>{" "}
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <img
                src={m.image_url}
                alt={m.caption || "Media image"}
                style={{ maxWidth: "150px", display: "block", marginBottom: "0.5rem" }}
              />
              <p>{m.caption}</p>
              <button onClick={() => setEditingId(m.id)}>Edit</button>{" "}
              <button onClick={() => deleteMedia(m.id)} style={{ color: "red" }}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Media;
