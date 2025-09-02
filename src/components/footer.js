




import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import axios from "axios";


const API_BASE_URL = process.env.REACT_APP_API_URL;
const Footer = () => {
  const [quickLinks, setQuickLinks] = useState([]);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/v1/footer`)
      .then(res => {
        const data = res.data;
        // Quick Links: all records that have link_name and link_url
        setQuickLinks(data.filter(f => f.link_name && f.link_url));
        // Contact Footer: first record with email/phone/address
        const contactFooter = data.find(f => f.email || f.phone || f.address);
        if (contactFooter) setContact(contactFooter);
      })
      .catch(err => console.error("Error fetching footer data:", err));
  }, []);

  if (!contact && quickLinks.length === 0) return null;

  return (
    <footer className="text-white py-4" style={{ background: "#192618" }}>
      <Container>
        <Row className="justify-content-between">
          {/* Quick Links */}
          <Col md={3}>
            <h5 style={{ color: "#D5ED9F" }}>Quick Links</h5>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.link_url} className="footer-link">{link.link_name}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3}>
            <h5 style={{ color: "#D5ED9F" }}>Contact Us</h5>
            {contact && (
              <>
                {contact.email && <p>Email: <a href={`mailto:${contact.email}`} className="footer-link">{contact.email}</a></p>}
                {contact.phone && <p>Phone: {contact.phone}</p>}
                {contact.address && <p>Address: {contact.address}</p>}
              </>
            )}
          </Col>

          {/* Social Links */}
          <Col md={3} className="text-center">
            <h5 style={{ color: "#D5ED9F" }}>Follow Us</h5>
            <div className="d-flex justify-content-center gap-3">
              {contact?.facebook && <a href={contact.facebook} target="_blank" rel="noreferrer" className="social-icon"><FaFacebookF /></a>}
              {contact?.twitter && <a href={contact.twitter} target="_blank" rel="noreferrer" className="social-icon"><FaTwitter /></a>}
              {contact?.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer" className="social-icon"><FaLinkedinIn /></a>}
              {contact?.instagram && <a href={contact.instagram} target="_blank" rel="noreferrer" className="social-icon"><FaInstagram /></a>}
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
