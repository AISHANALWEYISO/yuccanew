import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Table, Image } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", category: "", image: null });

  const token = localStorage.getItem("token");
  const API_URL = "http://127.0.0.1:5000/api/v1/products";

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/`);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // Create or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/edit/${editingProduct.id}`, data, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
        });
      } else {
        await axios.post(`${API_URL}/create`, data, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
        });
      }
      fetchProducts();
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: "", category: "", image: null });
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, category: product.category, image: null });
    setShowModal(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
      } catch (err) {
        console.error(err);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className="container my-4">
      <h2>Product Dashboard</h2>
      <Button
        onClick={() => {
          setShowModal(true);
          setEditingProduct(null);
          setFormData({ name: "", category: "", image: null });
        }}
        className="mb-3"
        style={{ backgroundColor: "#366000", border: "none" }}
      >
        <FaPlus /> Add Product
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>
                  {p.image ? (
                    <Image
                      src={`http://127.0.0.1:5000/static/uploads/${p.image}`}
                      alt={p.name}
                      fluid
                      style={{ maxHeight: "80px", objectFit: "contain" }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => handleEdit(p)}
                    style={{ backgroundColor: "#366000", border: "none" }}
                    className="me-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No products available</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>

            <Button
              type="submit"
              className="mt-2"
              style={{ backgroundColor: "#366000", border: "none" }}
            >
              {editingProduct ? "Update" : "Create"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductDashboard;
