
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card, Button, Row, Col, Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/services.css';

// // Import images
// import cropImg from '../images/kkk.jpeg';
// import precisionImg from '../images/farm managent.jpeg';
// import sustainabilityImg from '../images/food security.jpeg';
// import irrigationImg from '../images/irrigation.jpg';
// import pestsImg from '../images/cows1.jpeg';
// import capacityImg from '../images/tree.jpeg';
// import ser from '../images/ser.jpg'
// // Create a services array with proper image references
// const services = [
//   {
//     title: 'Crop Management',
//     image: cropImg,
//     description: 'Advising on crop selection, planting, irrigation, fertilization, and pest management.',
//   },
//   {
//     title: 'Soil Analysis',
//     image: ser, // using same image as cropImg; adjust if needed
//     description: 'Conducting soil tests, providing recommendations on soil health, and suggesting amendments.',
//   },
//   {
//     title: 'Precision Agriculture',
//     image: precisionImg,
//     description: 'Using drones, GPS, and sensors to optimize yields and reduce waste.',
//   },
//   {
//     title: 'Sustainability Consulting',
//     image: sustainabilityImg,
//     description: 'Sustainable practices, environmental assessments, and regulatory guidance.',
//   },
//   {
//     title: 'Irrigation Management',
//     image: irrigationImg,
//     description: 'Designing efficient systems to conserve water and boost yield.',
//   },
//   {
//     title: 'Pest & Disease Management',
//     image: pestsImg,
//     description: 'Identifying threats and implementing IPM strategies.',
//   },
//   {
//     title: 'Capacity Building',
//     image: capacityImg,
//     description: 'Training programs for farmers and agribusiness professionals.',
//   },
//    {
//     title: 'Capacity Building',
//     image: capacityImg,
//     description: 'Training programs for farmers and agribusiness professionals.',
//   },
//    {
//     title: 'Capacity Building',
//     image: capacityImg,
//     description: 'Training programs for farmers and agribusiness professionals.',
//   },
// ];

// const Services = () => {
//   return (
//     <Container className="my-5">
//       <h2 className="text-center mb-5 fw-bold" style={{ color: '#366000' }}>
//         Our Services
//       </h2>
//       <Row className="g-4">
//         {services.map((service, index) => (
//           <Col key={index} md={6} lg={4}>
//             <Card className="service-card h-100 shadow-sm">
//               <Card.Img
//                 variant="top"
//                 src={service.image}
//                 alt={service.title}
//                 className="service-img"
//               />
//               <Card.Body className="d-flex flex-column">
//                 <Card.Title style={{ color: '#366000' }}>{service.title}</Card.Title>
//                 <Card.Text>{service.description}</Card.Text>
//                 <div className="mt-auto">
//                   <Link to="/booking">
//                     <Button
//                       variant="outline-success"
//                       size="sm"
//                       style={{
//                         color: '#80a35dff', // Changed from "Color" to "color"
//                         borderColor: '#366000',
//                         fontWeight: '500',
//                         padding: '4px 12px'
//                       }}
//                       className="w-100"
//                     >
//                       Book now
//                     </Button>
//                   </Link>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default Services;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const backendBaseURL = 'http://127.0.0.1:5000';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get(`${backendBaseURL}/api/v1/services`)
      .then(res => {
        setServices(res.data.services);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
      });
  }, []);

  return (
    <div className="container " style={{marginTop:'100px'}}>
      <h2 className="text-center mb-4">Our Services</h2>
      <div className="row">
        {services.map(service => (
          <div className="col-md-4 mb-4" key={service.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={`${backendBaseURL}/${service.image}`}
                className="card-img-top"
                alt={service.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.description}</p>
                <p className="text-muted">UGX {service.price}</p>
                <span className="badge bg-secondary mb-2">{service.category}</span>

                {/* Book Now Button */}
                <Link
                  to={`/booking?service=${encodeURIComponent(service.name)}`}
                  className="btn  mt-auto"
                  style={{
    backgroundColor: '#366000',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  }}
             
  
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
