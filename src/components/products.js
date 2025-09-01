


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/products.css"; // custom styles
import "bootstrap/dist/css/bootstrap.min.css";

const PRODUCTS_API = "http://localhost:5000/api/v1/products";
const BANNER_API = "http://localhost:5000/api/v1/products/banner";

const Products = () => {
  const [bannerUrl, setBannerUrl] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchBanner();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(PRODUCTS_API);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchBanner = async () => {
    try {
      const res = await axios.get(BANNER_API);
      setBannerUrl(res.data.image_url || "");
    } catch (err) {
      console.error("Error fetching banner:", err);
    }
  };

  return (
    <div className="products-page">
      {/* Banner */}
      <div
        className="products-hero"
        style={{ backgroundImage: `url(${bannerUrl || "/images/default-banner.jpg"})` }}
      >
        <div className="overlay">
          <h1>Our Products</h1>
        </div>
      </div>

      {/* Products Section */}
      <div className="container py-5">
        <div className="row g-4">
          {products.length > 0 ? (
            products.map((p) => (
              <div key={p.product_id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm">
                  <div className="product-image-wrapper">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="product-image" />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{p.name}</h5>
                    {p.category && <p className="text-muted">{p.category}</p>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
