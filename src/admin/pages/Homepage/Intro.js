// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_BASE = 'http://localhost:5000/api/v1/homepage';

// const IntroManager = () => {
//   const [intro, setIntro] = useState({ heading: '', paragraph: '' });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState('');

//   // Fetch intro data from backend on component mount
//   useEffect(() => {
//     const fetchIntro = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/intro`);
//         setIntro(res.data);
//       } catch (error) {
//         setMessage('Failed to load intro content');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchIntro();
//   }, []);

//   const handleChange = (e) => {
//     setIntro({ ...intro, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     setMessage('');
//     try {
//       await axios.put(`${API_BASE}/intro`, intro);
//       setMessage('Intro content updated successfully!');
//     } catch (error) {
//       setMessage('Failed to save intro content');
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p>Loading intro content...</p>;

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <h2>Manage Homepage Intro</h2>

//       <label style={{ display: 'block', marginBottom: '0.5rem' }}>Heading:</label>
//       <input
//         type="text"
//         name="heading"
//         value={intro.heading}
//         onChange={handleChange}
//         style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
//       />

//       <label style={{ display: 'block', marginBottom: '0.5rem' }}>Paragraph:</label>
//       <textarea
//         name="paragraph"
//         value={intro.paragraph}
//         onChange={handleChange}
//         rows={5}
//         style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
//       />

//       <button
//         onClick={handleSave}
//         disabled={saving}
//         style={{
//           backgroundColor: '#366000',
//           color: 'white',
//           padding: '10px 20px',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: saving ? 'not-allowed' : 'pointer',
//         }}
//       >
//         {saving ? 'Saving...' : 'Save Changes'}
//       </button>

//       {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
//     </div>
//   );
// };

// export default IntroManager;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/homepage';

const Intro = () => {
  const [intro, setIntro] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false); // <-- added

  const token = localStorage.getItem('token');

  const fetchIntro = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/intro`);
      setIntro(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setEditing(true);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setIntro(null);
        setTitle('');
        setDescription('');
        setEditing(false);
      } else {
        setError('Failed to fetch intro.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntro();
  }, []);

  const createIntro = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post(
        `${API_BASE_URL}/intro`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchIntro();
    } catch (err) {
      setError('Failed to create intro.');
    } finally {
      setLoading(false);
    }
  };

  const updateIntro = async () => {
    if (!intro?.id) return setError('Intro ID missing.');
    setLoading(true);
    setError('');
    try {
      await axios.put(
        `${API_BASE_URL}/intro/${intro.id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchIntro();
    } catch (err) {
      setError('Failed to update intro.');
    } finally {
      setLoading(false);
    }
  };

  const deleteIntro = async () => {
    if (!intro?.id) return setError('Intro ID missing.');
    setLoading(true);
    setError('');
    try {
      await axios.delete(`${API_BASE_URL}/intro/${intro.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIntro(null);
      setTitle('');
      setDescription('');
      setEditing(false);
    } catch (err) {
      setError('Failed to delete intro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Homepage Intro</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            placeholder="Enter intro title"
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Description:
          <textarea
            value={description}
            placeholder="Enter intro description"
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }}
          />
        </label>
      </div>

      <div>
        {editing ? (
          <>
            <button onClick={updateIntro} disabled={loading} style={{ marginRight: '1rem' }}>
              Update Intro
            </button>
            <button
              onClick={deleteIntro}
              disabled={loading}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Delete Intro
            </button>
          </>
        ) : (
          <button onClick={createIntro} disabled={loading}>
            Create Intro
          </button>
        )}
      </div>
    </div>
  );
};

export default Intro;
