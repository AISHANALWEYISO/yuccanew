import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Table, Spinner } from "react-bootstrap";
import { FaTrash, FaEdit, FaUpload } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const PRODUCTS_API = `${API_BASE_URL}/api/v1/products`;
const BANNER_API = `${API_BASE_URL}/api/v1/products/banner`;
const BANNER_UPLOAD_API = `${API_BASE_URL}/api/v1/products/banner/upload`;

const Products = () => {
  const [bannerUrl, setBannerUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Product Modal States
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", category: "", image: null });

  // Banner Upload
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await axios.post(BANNER_UPLOAD_API, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBannerUrl(res.data.image_url);
    } catch (err) {
      console.error("Banner upload failed:", err);
    }
  };

  // Fetch products + banner
  useEffect(() => {
    fetchProducts();
    fetchBanner();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(PRODUCTS_API);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
    setLoading(false);
  };

  const fetchBanner = async () => {
    try {
      const res = await axios.get(BANNER_API);
      setBannerUrl(res.data.image_url || "");
    } catch (err) {
      console.error("Error fetching banner:", err);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Open modal for Add
  const handleAdd = () => {
    setEditMode(false);
    setFormData({ name: "", category: "", image: null });
    setShowModal(true);
  };

  // Open modal for Edit
  const handleEdit = (product) => {
    setEditMode(true);
    setCurrentProduct(product);
    setFormData({ name: product.name, category: product.category, image: null });
    setShowModal(true);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editMode && currentProduct) {
        await axios.put(`${PRODUCTS_API}/${currentProduct.product_id}`, data);
      } else {
        await axios.post(PRODUCTS_API, data);
      }
      fetchProducts();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${PRODUCTS_API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div>
      {/* Banner */}
      <div
        className="d-flex align-items-center justify-content-center text-white"
        style={{
          height: "300px",
          backgroundImage: `url(${bannerUrl || "/images/default-banner.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          className="overlay position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        />
        <h1 className="position-relative">Our Products</h1>
        <label
          className="btn btn-light position-absolute"
          style={{ bottom: "20px", right: "20px" }}
        >
          <FaUpload /> Change Banner
          <input type="file" hidden onChange={handleBannerUpload} />
        </label>
      </div>

      {/* Products Section */}
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Product List</h2>
          <Button variant="success" onClick={handleAdd}>
            + Add Product
          </Button>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Category</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={p.product_id}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{ width: "60px", height: "60px", borderRadius: "8px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(p)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(p.product_id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
           
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              {editMode ? "Update Product" : "Add Product"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Products;
