import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);

  const API_URL = 'http://127.0.0.1:5000/api/v1/products';

  // Fetch products and banner dynamically from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/`);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchBanner = async () => {
      try {
        // Example: get banner from backend (adjust endpoint as needed)
        const res = await axios.get(`${API_URL}/banner`);
        setBannerImage(res.data.banner_image); // expects a URL or path
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
    fetchBanner();
  }, []);

  return (
    <div>
      {/* Banner Section */}
      {bannerImage && (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <img
            src={`http://127.0.0.1:5000${bannerImage}`}
            alt="Products Banner"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      )}

      {/* Products Section */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          {products.map((product, index) => (
            <div key={index} className="col-md-3 col-sm-6 text-center mb-4">
              <div className="product-circle">
                <img
                  src={`http://127.0.0.1:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="product-image"
                  style={{ objectFit: 'contain' }} // preserves splash effect
                />
              </div>
              <h5 className="mt-3">{product.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;


