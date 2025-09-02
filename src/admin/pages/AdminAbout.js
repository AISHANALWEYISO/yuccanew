import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AboutDashboard = () => {
  const [aboutId, setAboutId] = useState(null);
  const [formData, setFormData] = useState({
    intro_text: '',
    vision_title: '',
    vision_text: '',
    mission_title: '',
    mission_text: '',
    values_title: '',
    values_list: '',
    expertise_title: '',
    expertise_intro: '',
    expertise_list: '',
  });

  const [images, setImages] = useState({
    intro_image: null,
    values_image: null,
    expertise_image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Updated URLs to match your Flask routes
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const CREATE_URL = `${API_BASE_URL}/api/v1/about/create`;
  const EDIT_URL = (id) => `${API_BASE_URL}/api/v1/about/edit/${id}`;

  const token = localStorage.getItem('token'); // Assuming JWT is stored here

  // Fetch existing About data
  useEffect(() => {
    axios.get(API_BASE_URL)
      .then(res => {
        const data = res.data;
        setAboutId(data.id);
        setFormData({
          intro_text: data.intro_text || '',
          vision_title: data.vision_title || '',
          vision_text: data.vision_text || '',
          mission_title: data.mission_title || '',
          mission_text: data.mission_text || '',
          values_title: data.values_title || '',
          values_list: data.values_list || '',
          expertise_title: data.expertise_title || '',
          expertise_intro: data.expertise_intro || '',
          expertise_list: data.expertise_list || '',
        });
      })
      .catch(err => console.log('No About data found', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setImages(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    Object.keys(images).forEach(key => {
      if (images[key]) data.append(key, images[key]);
    });

    try {
      let res;
      if (aboutId) {
        res = await axios.put(EDIT_URL(aboutId), data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        res = await axios.post(CREATE_URL, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAboutId(res.data.id);
      }
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage('Error updating About page');
    }
    setLoading(false);
  };

  return (
    <div className="container my-4" style={{ backgroundColor: '#f2fff2', padding: '20px', borderRadius: '10px' }}>
      <h2>About Page Dashboard</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <h4>Intro Section</h4>
        <textarea
          name="intro_text"
          value={formData.intro_text}
          onChange={handleChange}
          placeholder="Intro Text"
          className="form-control mb-2"
        />
        <input type="file" name="intro_image" onChange={handleFileChange} className="form-control mb-3" />

        <h4>Vision</h4>
        <input
          type="text"
          name="vision_title"
          value={formData.vision_title}
          onChange={handleChange}
          placeholder="Vision Title"
          className="form-control mb-2"
        />
        <textarea
          name="vision_text"
          value={formData.vision_text}
          onChange={handleChange}
          placeholder="Vision Text"
          className="form-control mb-3"
        />

        <h4>Mission</h4>
        <input
          type="text"
          name="mission_title"
          value={formData.mission_title}
          onChange={handleChange}
          placeholder="Mission Title"
          className="form-control mb-2"
        />
        <textarea
          name="mission_text"
          value={formData.mission_text}
          onChange={handleChange}
          placeholder="Mission Text"
          className="form-control mb-3"
        />

        <h4>Values</h4>
        <input
          type="text"
          name="values_title"
          value={formData.values_title}
          onChange={handleChange}
          placeholder="Values Title"
          className="form-control mb-2"
        />
        <textarea
          name="values_list"
          value={formData.values_list}
          onChange={handleChange}
          placeholder="Values List (one per line)"
          className="form-control mb-2"
        />
        <input type="file" name="values_image" onChange={handleFileChange} className="form-control mb-3" />

        <h4>Expertise</h4>
        <input
          type="text"
          name="expertise_title"
          value={formData.expertise_title}
          onChange={handleChange}
          placeholder="Expertise Title"
          className="form-control mb-2"
        />
        <textarea
          name="expertise_intro"
          value={formData.expertise_intro}
          onChange={handleChange}
          placeholder="Expertise Intro"
          className="form-control mb-2"
        />
        <textarea
          name="expertise_list"
          value={formData.expertise_list}
          onChange={handleChange}
          placeholder="Expertise List (one per line)"
          className="form-control mb-2"
        />
        <input type="file" name="expertise_image" onChange={handleFileChange} className="form-control mb-3" />

        <button
          type="submit"
          className="btn mb-3"
          style={{ backgroundColor: '#366000', color: '#fff' }}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AboutDashboard;
