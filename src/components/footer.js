
// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Col } from "react-bootstrap";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaLinkedinIn,
//   FaInstagram,
// } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="text-white py-4" style={{ background: "#192618" }}>
//       <Container>
//         {/* Quick Links & Contact */}
//         <Row className="justify-content-between">
//           <Col md={3}>
//             <h5 className="mb-3" style={{ color: "#D5ED9F" }}>Quick Links</h5>
//             <ul className="list-unstyled">
//               <li><a href="/about" className="footer-link">Our Story</a></li>
//               <li><a href="/services" className="footer-link">Services</a></li>
//               <li><a href="/contact" className="footer-link">Contact</a></li>
//             </ul>
//           </Col>

//           <Col md={3}>
//             <h5 className="mb-3" style={{ color: "#D5ED9F" }}>Contact Us</h5>
//             <p>Email: <a href="mailto:yuccan.consult.ac@gmail.com" className="footer-link">yuccan.consult.ac@gmail.com</a></p>
//             <p>Phone: +256-705570825</p>
//             <p>Address: Namutumba district, 100120. Iganga</p>
//           </Col>

//           {/* Social Media */}
//           <Col md={3} className="text-center">
//             <h5 className="mb-3" style={{ color: "#D5ED9F" }}>Follow Us</h5>
//             <div className="d-flex justify-content-center gap-3">
//               <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><FaFacebookF /></a>
//               <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon"><FaTwitter /></a>
//               <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon"><FaLinkedinIn /></a>
//               <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><FaInstagram /></a>
//             </div>
//           </Col>
//         </Row>

//         {/* Copyright */}
//         <hr style={{ borderColor: "#366000", marginTop: "30px" }} />
//         <Row>
//           <Col className="text-center">
//             <small>
//               &copy; {new Date().getFullYear()} Yucca Consulting Limited. All rights reserved.
//             </small>
//           </Col>
//         </Row>
//       </Container>

//       {/* Styles */}
//       <style jsx>{`
//         .footer-link {
//           color: white;
//           text-decoration: none;
//           transition: color 0.3s;
//         }
//         .footer-link:hover {
//           color: #366000;
//         }
//         .social-icon {
//           color: white;
//           font-size: 1.3rem;
//           transition: color 0.3s, transform 0.3s;
//         }
//         .social-icon:hover {
//           color: #366000;
//           transform: scale(1.2);
//         }
//       `}</style>
//     </footer>
//   );
// };

// export default Footer;




import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/v1/footer";

const Footer = () => {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    axios.get(API_BASE).then(res => {
      if (res.data.length > 0) setFooter(res.data[0]);
    });
  }, []);

  if (!footer) return null;

  return (
    <footer className="text-white py-4" style={{ background: "#192618" }}>
      <Container>
        <Row className="justify-content-between">
          <Col md={3}>
            <h5 style={{ color: "#D5ED9F" }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href={footer.link_url} className="footer-link">{footer.link_name}</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 style={{ color: "#D5ED9F" }}>Contact Us</h5>
            <p>Email: <a href={`mailto:${footer.email}`} className="footer-link">{footer.email}</a></p>
            <p>Phone: {footer.phone}</p>
            <p>Address: {footer.address}</p>
          </Col>
          <Col md={3} className="text-center">
            <h5 style={{ color: "#D5ED9F" }}>Follow Us</h5>
            <div className="d-flex justify-content-center gap-3">
              <a href={footer.facebook} target="_blank" rel="noreferrer" className="social-icon"><FaFacebookF /></a>
              <a href={footer.twitter} target="_blank" rel="noreferrer" className="social-icon"><FaTwitter /></a>
              <a href={footer.linkedin} target="_blank" rel="noreferrer" className="social-icon"><FaLinkedinIn /></a>
              <a href={footer.instagram} target="_blank" rel="noreferrer" className="social-icon"><FaInstagram /></a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: "#366000", marginTop: "30px" }} />
        <Row>
          <Col className="text-center">
            <small>&copy; {new Date().getFullYear()} Yucca Consulting Limited. All rights reserved.</small>
          </Col>
        </Row>

      </Container>

      <style jsx>{`
        .footer-link { color: white; text-decoration: none; transition: color 0.3s; }
        .footer-link:hover { color: #366000; }
        .social-icon { color: white; font-size: 1.3rem; transition: color 0.3s, transform 0.3s; }
        .social-icon:hover { color: #366000; transform: scale(1.2); }
      `}</style>
    </footer>
  );
};

export default Footer;
