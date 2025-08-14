

// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col } from 'react-bootstrap';

// const Footer = () => {
//   return (
//     <footer className="text-white py-4 " style={{ background: '#192618' }}>
//       <Container className='mt-1'>
//         {/* Useful Links & Contact Info side by side */}
//         <Row className="justify-content-center">
//           <Col md={5}>
//             <h5>Useful Info</h5>
//             <ul className="list-unstyled">
//               <li><a href="/about" className="text-white">Our Story</a></li>
//               <li><a href="/services" className="text-white">Services</a></li>
//               <li><a href="/contact" className="text-white">Contact</a></li>
//             </ul>
//           </Col>

//           <Col md={5} style={{marginLeft:''}}>
//             <h5>Contact Us</h5>
//             <p>Email: <a href="mailto:yuccan.consult.ac@gmail.com" className="text-white">yuccan.consult.ac@gmail.com</a></p>
//             <p>Phone: +256-705570825</p>
//             <p>Address: Namutumba district, 100120. Iganga</p>
//           </Col>
//         </Row>

//         {/* Bottom Footer */}
//         <Row className="mt-3">
//           <Col className="text-center">
//             <small>&copy; {new Date().getFullYear()} Yucca Consulting Limited. All rights reserved.</small>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTwitter, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-4" style={{ background: '#192618' }}>
      <Container className='mt-1'>

        {/* Useful Links & Contact Info */}
        <Row className="justify-content-center">
          <Col md={4}>
            <h5>Useful Info</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white text-decoration-none">Our Story</a></li>
              <li><a href="/services" className="text-white text-decoration-none">Services</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: <a href="mailto:yuccan.consult.ac@gmail.com" className="text-white text-decoration-none">yuccan.consult.ac@gmail.com</a></p>
            <p>Phone: +256-705570825</p>
            <p>Address: Namutumba district, 100120. Iganga</p>
          </Col>

          <Col md={4}>
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 mt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-white fs-4 social-icon">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-white fs-4 social-icon">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="text-white fs-4 social-icon">
                <FaYoutube />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-white fs-4 social-icon">
                <FaFacebookF />
              </a>
            </div>
          </Col>
        </Row>

        {/* Bottom Footer */}
        <Row className="mt-3">
          <Col className="text-center">
            <small>&copy; {new Date().getFullYear()} Yucca Consulting Limited. All rights reserved.</small>
          </Col>
        </Row>
      </Container>

      {/* Hover Effect Styles */}
      <style>{`
        .social-icon:hover {
          color: #ffd700;
          transform: scale(1.2);
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
