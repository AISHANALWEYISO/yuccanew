
// // src/pages/ContactUs.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import '../styles/Contact.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';


// const API_BASE = "http://localhost:5000/api/v1/footer";

// const ContactUs = () => {
//   const [footer, setFooter] = useState(null);

//   // Fetch footer info (email, phone, address, social)
//   useEffect(() => {
//     axios.get(API_BASE).then(res => {
//       if (res.data.length > 0) setFooter(res.data[0]);
//     }).catch(err => console.error("Error fetching footer:", err));
//   }, []);

//   if (!footer) return null;

//   return (
//     <div className="contact-page">
//       {/* Hero Banner */}
//       <div className="contact-hero">
//         <div className="overlay">
//           <h1>Contact Us</h1>
//         </div>
//       </div>

//       {/* Contact Section */}
//       <div className="contact-section container">
//         {/* Form */}
//         <div className="contact-left">
//           <h2>Get In Touch</h2>
//           <form>
//             <div className="name-fields">
//               <input type="text" placeholder="First Name" name="firstName" />
//               <input type="text" placeholder="Last Name" name="lastName" />
//             </div>
//             <input type="email" placeholder="Your Email" name="email" />
//             <input type="text" placeholder="Subject" name="subject" />
//             <textarea placeholder="Your Message" name="message"></textarea>
//             <button type="submit">Send Message</button>
//           </form>
//         </div>

//         {/* Contact Info */}
//         <div className="contact-right mt-100px">
//           <h2>Contact Info</h2>
//             <p>
//     <i className="fas fa-phone"></i> {footer.phone}
//   </p>
//   <p>
//     <i className="fas fa-envelope"></i> <a href={`mailto:${footer.email}`}>{footer.email}</a>
//   </p>
//   <p>
//     <i className="fas fa-map-marker-alt"></i> {footer.address}
//   </p>

//           <h3>Follow Us</h3>
//           <div className="social-icons">
//             {footer.facebook && (
//               <a href={footer.facebook} target="_blank" rel="noreferrer">
//                 <i className="fab fa-facebook-f"></i>
//               </a>
//             )}
//             {footer.twitter && (
//               <a href={footer.twitter} target="_blank" rel="noreferrer">
//                 <i className="fab fa-twitter"></i>
//               </a>
//             )}
//             {footer.linkedin && (
//               <a href={footer.linkedin} target="_blank" rel="noreferrer">
//                 <i className="fab fa-linkedin-in"></i>
//               </a>
//             )}
//             {footer.instagram && (
//               <a href={footer.instagram} target="_blank" rel="noreferrer">
//                 <i className="fab fa-instagram"></i>
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;




// src/pages/ContactUs.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Contact.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FOOTER_API = "http://localhost:5000/api/v1/footer";
const CONTACT_API = "http://localhost:5000/api/v1/contact/submit";
const BANNER_API = "http://localhost:5000/api/v1/contact/banner";

const ContactUs = () => {
  const [footer, setFooter] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(""); // Dynamic banner URL
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  // Fetch footer info and banner image
  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get(FOOTER_API);
        if (res.data.length > 0) setFooter(res.data[0]);
      } catch (err) {
        console.error("Error fetching footer:", err);
      }
    };

    const fetchBanner = async () => {
      try {
        const res = await axios.get(BANNER_API);
        // If backend returns null or empty, fallback to default image
        if (res.data.banner_url) {
          setBannerUrl(res.data.banner_url);
        } else {
          setBannerUrl("/images/food.jpg"); // default local image
        }
      } catch (err) {
        console.error("Error fetching banner:", err);
        setBannerUrl("/images/food.jpg"); // fallback
      }
    };

    fetchFooter();
    fetchBanner();
  }, []);

  if (!footer) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(CONTACT_API, formData);
      toast.success(res.data.message || "Message sent successfully!");
      setFormData({ first_name: "", last_name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to send message");
    }
    setLoading(false);
  };

  return (
    <div className="contact-page">
      <ToastContainer />
      {/* Hero Banner */}
      <div
        className="contact-hero"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      >
        <div className="overlay">
          <h1>Contact Us</h1>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section container">
        {/* Form */}
        <div className="contact-left">
          <h2>Get In Touch</h2>
          <form onSubmit={handleSubmit}>
            <div className="name-fields">
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-right">
          <h2>Contact Info</h2>
          <p><i className="fas fa-phone"></i> {footer.phone}</p>
          <p><i className="fas fa-envelope"></i> <a href={`mailto:${footer.email}`}>{footer.email}</a></p>
          <p><i className="fas fa-map-marker-alt"></i> {footer.address}</p>

          <h3>Follow Us</h3>
          <div className="social-icons">
            {footer.facebook && <a href={footer.facebook} target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>}
            {footer.twitter && <a href={footer.twitter} target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>}
            {footer.linkedin && <a href={footer.linkedin} target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>}
            {footer.instagram && <a href={footer.instagram} target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
