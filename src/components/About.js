



// src/pages/About.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import axios from 'axios';
import '../styles/About.css'

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const backendBaseURL = 'http://127.0.0.1:5000'; // base URL for images

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(`${backendBaseURL}/api/v1/about/`);
        setAboutData(response.data);
      } catch (error) {
        console.error('Error fetching About page data:', error);
      }
    };
    fetchAbout();
  }, []);

  if (!aboutData) {
    return (
      <div style={{ backgroundColor: '#f2fff2', minHeight: '100vh', padding: '40px' }}>
        <Container>
          <p>Loading About page...</p>
        </Container>
      </div>
    );
  }

  const valuesList = aboutData.values_list ? aboutData.values_list.split('\n') : [];
  const expertiseList = aboutData.expertise_list ? aboutData.expertise_list.split('\n') : [];

  const boldFirstWord = (text) => {
    const [first, ...rest] = text.split(' ');
    return (
      <span>
        <span style={{ fontWeight: 600 }}>{first}</span> {rest.join(' ')}
      </span>
    );
  };

  return (
    <div style={{ backgroundColor: '#f2fff2', width: '100%', minHeight: '100vh', paddingTop: 0 }}>
      <Container fluid style={{ padding: 0 }}>
        {/* Intro Section */}
        <Row className="align-items-center gx-0" style={{ minHeight: '400px', marginTop: '-56px' }}>
          <Col md={6} style={{ padding: 0 }}>
            {aboutData.intro_image && (
              <Image
                src={`${backendBaseURL}${aboutData.intro_image}`}
                alt="Intro"
                fluid
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </Col>
          <Col md={6} style={{ backgroundColor: '#f2fff2', padding: '40px' }}>
            <h2 className="text-dark mb-3">About Us</h2>
            <p className="fw-light fs-5">{aboutData.intro_text}</p>
          </Col>
        </Row>

        {/* Vision & Mission */}
        <Row className="mt-2 gx-0 mb-5">
          <Col md={6} className="mb-2">
            <Card className="h-100 text-white" style={{ backgroundColor: '#366000', borderRadius: '8px' }}>
              <Card.Body>
                <Card.Title className="fs-4">{aboutData.vision_title}</Card.Title>
                <Card.Text>{aboutData.vision_text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-2">
            <Card className="h-100 text-white" style={{ backgroundColor: '#192618', borderRadius: '8px' }}>
              <Card.Body>
                <Card.Title className="fs-4">{aboutData.mission_title}</Card.Title>
                <Card.Text>{aboutData.mission_text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Values Section */}
        <Row className="align-items-start mt-5 mb-5 gx-0">
          <Col md={6} style={{ padding: '0 20px' }}>
            <h4 className="text-dark mb-3">{aboutData.values_title}</h4>
            <ol className="fs-6 fw-light" style={{ textAlign: 'left', paddingLeft: '20px' }}>
              {valuesList.map((val, index) => (
                <li key={index} className="mb-2">{boldFirstWord(val)}</li>
              ))}
            </ol>
          </Col>
          <Col md={6} style={{ padding: 0 }}>
            {aboutData.values_image && (
              <Image
                src={`${backendBaseURL}${aboutData.values_image}`}
                alt="Values"
                fluid
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </Col>
        </Row>

        {/* Expertise Section */}
        <Row className="align-items-center my-5 gx-0">
          <Col md={6} style={{ padding: 0 }}>
            {aboutData.expertise_image && (
              <Image
                src={`${backendBaseURL}${aboutData.expertise_image}`}
                alt="Expertise"
                fluid
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </Col>
          <Col md={6} style={{ backgroundColor: '#f2fff2', padding: '40px' }}>
            <h5 className="fw-bold mb-3">{aboutData.expertise_title}</h5>
            <p className="mb-4">{aboutData.expertise_intro}</p>
            <ul className="list-unstyled" style={{ textAlign: 'left' }}>
              {expertiseList.map((exp, index) => (
                <li key={index} className="mb-2">• {exp}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
