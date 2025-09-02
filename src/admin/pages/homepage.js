

import React, { useState, useEffect } from "react";
import axios from "axios";

const HomepageDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [intro, setIntro] = useState({ title: "", subtitle: "", rectangle_image: null });
  const [dealers, setDealers] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const API = `${API_BASE_URL }/api/v1/homepage`;

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [i, p, pa, inter, d] = await Promise.all([
        axios.get(`${API}/intro`),
        axios.get(`${API}/products`),
        axios.get(`${API}/partners`),
        axios.get(`${API}/interventions`),
        axios.get(`${API}/dealers`),
      ]);

      setIntro({
        title: i.data.title || "",
        subtitle: i.data.text || "",
        rectangle_image: i.data.image || null
      });
      setProducts(p.data || []);
      setPartners(pa.data || []);
      setInterventions(inter.data || []);
      setDealers(d.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (section, index, field, value) => {
    const setters = {
      intro: setIntro,
      dealers: setDealers,
      interventions: setInterventions,
      products: setProducts,
      partners: setPartners,
    };

    if (section === "intro") {
      setters[section](prev => ({ ...prev, [field]: value }));
    } else {
      setters[section](prev => {
        const updated = [...prev];
        updated[index][field] = value;
        return updated;
      });
    }
  };

  const handleFileChange = (section, index, field, file) => {
    handleChange(section, index, field, file);
  };

  const addItem = section => {
    const templates = {
      dealers: { title: "", description: "", image: null },
      interventions: { title: "", description: "", image: null },
      products: { name: "", image: null },
      partners: { name: "", logo: null, link: "" },
    };
    const setters = {
      dealers: setDealers,
      interventions: setInterventions,
      products: setProducts,
      partners: setPartners,
    };
    setters[section](prev => [...prev, templates[section]]);
  };

  const deleteItem = (section, index) => {
    const setters = {
      dealers: setDealers,
      interventions: setInterventions,
      products: setProducts,
      partners: setPartners,
    };
    setters[section](prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    setLoading(true);
    const formData = new FormData();
    const token = localStorage.getItem("token");

    // Intro
    formData.append("intro_title", intro.title);
    formData.append("intro_subtitle", intro.subtitle);

    if (intro.rectangle_image instanceof File) {
      formData.append("intro_image", intro.rectangle_image);
    } else if (intro.rectangle_image) {
      formData.append("intro_image", intro.rectangle_image); // preserve existing
    }

    // Helper to append dynamic sections
    const appendSection = (data, sectionName, fields, fileField) => {
      data.forEach((item, idx) => {
        const hasAny = fields.some(f => item[f]) || item[fileField];
        if (!hasAny) return;

        fields.forEach(field => {
          if (item[field]) formData.append(`${sectionName}[${idx}][${field}]`, item[field]);
        });

        if (item[fileField] instanceof File) {
          formData.append(`${sectionName}[${idx}][${fileField}]`, item[fileField]);
        } else if (item[fileField]) {
          formData.append(`${sectionName}[${idx}][${fileField}]`, item[fileField]); // keep existing path
        }
      });
    };

    appendSection(dealers, "dealers", ["title", "description"], "image");
    appendSection(interventions, "interventions", ["title", "description"], "image");
    appendSection(products, "products", ["name"], "image");
    appendSection(partners, "partners", ["name", "link"], "logo");

    try {
      await axios.post(`${API}/save-all`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("All homepage content saved successfully!");
      fetchData(); // reload with fresh data
    } catch (err) {
      console.error(err);
      setMessage("Error saving homepage content");
    } finally {
      setLoading(false);
    }
  };

  const buttonGreen = {
    backgroundColor: "#366000",
    borderColor: "#366000",
    color: "white",
    borderRadius: "6px",
    padding: "0.25rem 0.5rem",
    fontSize: "0.8rem",
    marginRight: "5px",
  };

  const sections = [
    { title: "Dealers In", data: dealers, section: "dealers" },
    { title: "Interventions", data: interventions, section: "interventions" },
    { title: "Products", data: products, section: "products" },
    { title: "Partners", data: partners, section: "partners" },
  ];

  return (
    <div className="container my-4">
      <h2 style={{ color: "#366000" }}>Homepage Dashboard</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {/* Intro */}
      <div className="card p-3 my-3">
        <h4 style={{ color: "#366000" }}>Intro / Rectangle Panel</h4>
        <input
          type="text"
          value={intro.title}
          placeholder="Title"
          className="form-control mb-2"
          onChange={e => handleChange("intro", 0, "title", e.target.value)}
        />
        <textarea
          value={intro.subtitle}
          placeholder="Subtitle / Text"
          className="form-control mb-2"
          onChange={e => handleChange("intro", 0, "subtitle", e.target.value)}
        />
        {intro.rectangle_image && !(intro.rectangle_image instanceof File) && (
          <img
            src={intro.rectangle_image}
            alt="rectangle"
            style={{ width: "200px", marginBottom: "10px", borderRadius: "10px" }}
          />
        )}
        <input
          type="file"
          onChange={e =>
            handleFileChange("intro", 0, "rectangle_image", e.target.files[0])
          }
        />
      </div>

      {/* Dynamic Sections */}
      {sections.map(({ title, data, section }) => (
        <div className="card p-3 my-3" key={section}>
          <h4 style={{ color: "#366000" }}>{title}</h4>
          {data.map((item, idx) => (
            <div
              key={idx}
              className="mb-2 p-2"
              style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            >
              {Object.keys(item).map(
                field =>
                  field !== "id" &&
                  field !== "image" &&
                  field !== "logo" && (
                    <input
                      key={field}
                      type="text"
                      value={item[field] || ""}
                      placeholder={field}
                      className="form-control mb-1"
                      onChange={e =>
                        handleChange(section, idx, field, e.target.value)
                      }
                    />
                  )
              )}
              {(item.image || item.logo) &&
                !(item.image instanceof File) &&
                !(item.logo instanceof File) && (
                  <img
                    src={item.image || item.logo}
                    alt=""
                    style={{
                      width: "120px",
                      borderRadius: "8px",
                      marginBottom: "5px",
                    }}
                  />
                )}
              <input
                type="file"
                onChange={e =>
                  handleFileChange(
                    section,
                    idx,
                    section === "partners" ? "logo" : "image",
                    e.target.files[0]
                  )
                }
              />
              <button
                type="button"
                className="btn btn-danger btn-sm mt-1"
                onClick={() => deleteItem(section, idx)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            style={buttonGreen}
            onClick={() => addItem(section)}
          >
            Add
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-success"
        onClick={handleSaveAll}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save All"}
      </button>
    </div>
  );
};

export default HomepageDashboard;
