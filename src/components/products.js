// import React, { useEffect, useState } from 'react';
// import '../styles/products.css';
// import axios from 'axios';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [bannerImage, setBannerImage] = useState(null);

//   const API_URL = 'http://127.0.0.1:5000/api/v1/products';

//   // Fetch products and banner dynamically from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/`);
//         setProducts(res.data.products);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     const fetchBanner = async () => {
//       try {
//         // Example: get banner from backend (adjust endpoint as needed)
//         const res = await axios.get(`${API_URL}/banner`);
//         setBannerImage(res.data.banner_image); // expects a URL or path
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchProducts();
//     fetchBanner();
//   }, []);

//   return (
//     <div>
//       {/* Banner Section */}
//       {bannerImage && (
//         <div style={{ width: '100%', overflow: 'hidden' }}>
//           <img
//             src={`http://127.0.0.1:5000${bannerImage}`}
//             alt="Products Banner"
//             style={{
//               width: '100%',
//               height: 'auto',
//               objectFit: 'cover',
//               display: 'block',
//             }}
//           />
//         </div>
//       )}

//       {/* Products Section */}
//       <div className="container mt-5">
//         <div className="row justify-content-center">
//           {products.map((product, index) => (
//             <div key={index} className="col-md-3 col-sm-6 text-center mb-4">
//               <div className="product-circle">
//                 <img
//                   src={`http://127.0.0.1:5000/uploads/${product.image}`}
//                   alt={product.name}
//                   className="product-image"
//                   style={{ objectFit: 'contain' }} // preserves splash effect
//                 />
//               </div>
//               <h5 className="mt-3">{product.name}</h5>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;


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
