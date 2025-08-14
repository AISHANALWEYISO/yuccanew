


import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import image from'../images/image1.jpeg'
import image3 from '../images/image3.jpeg'
import cows from '../images/cows.jpg'
const About = () => {
  return (
    <Container className="mt-2" style={{backgroundColor:'#f2fff2', }} gx-0>
      <Row className="align-items-center">
       
        <Col md={6}>
          <Image
            src={image} 
            alt="Yucca Consulting"
            fluid
            rounded
            className="shadow"
          />
        </Col>

      
        <Col md={6}>
          <h2 className="text-dark mb-3 ">About Us</h2>
          <p className='fw-light fs-5'>
            Yucca Consulting Limited is a dynamic and innovative consulting firm specializing in
            agribusiness, value chain, agritech, environmental, and social-economic services.
          </p>
          <p className='fw-light fs-5'>
            We empower farmers, communities, and organizations to adopt sustainable practices,
            technologies, and innovations that drive economic growth, environmental stewardship,
            and social well-being.
          </p>
        </Col>
      </Row>
      <Row className="mt-5 gx-0" >
       
        <Col md={6} className="mb-4">
          <Card className="h-100 text-white" style={{ backgroundColor: '#366000' }}>
            <Card.Body>
              <Card.Title className="fs-4">Our Vision</Card.Title>
              <Card.Text>
            To drive sustainable agricultural practices, promote environmental conservation and enhace
               livelihoods while fostering partnerships and innovation
              
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        
        <Col md={6} className="mb-4">
          <Card className="h-100 text-white" style={{ backgroundColor: '#192618' }}>
            <Card.Body>
              <Card.Title className="fs-4">Our Mission</Card.Title>
              <Card.Text>
                   To be the leading catalyst for a sustainable future where agriculture 
              and nature thrive in harmony.
              
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      

  

<Row className="align-items-start mt-5">
  <Col md={6} className="">
    <h4 className="text-dark mb-3">Our Values</h4>
    <ol className="fs-6,fw-light" style={{textAlign:'left' }}>
      <li className="mb-3">
        <strong>Sustainability:</strong> Embracing practices that meet present needs without compromising future generations’ ability to meet theirs. This value guides Yucca Consulting Limited’s approach to environmental stewardship and social responsibility.
      </li>
      <li className="mb-3">
        <strong>Innovation:</strong> Encouraging creativity, experimentation, and continuous improvement to develop novel solutions for sustainable development and agricultural productivity.
      </li>
      <li className="mb-3">
        <strong>Partnership:</strong> Fostering collaborative relationships with stakeholders including farmers, communities, organizations, and governments to leverage expertise, resources, and knowledge.
      </li>
      <li className="mb-3">
        <strong>Integrity:</strong> Upholding the highest standards of ethics, transparency, and accountability in all interactions, ensuring trust and credibility with stakeholders.
      </li>
      <li className="mb-3">
        <strong>Excellence:</strong> Striving for outstanding performance, quality, and impact in all aspects of the company’s work, driving continuous improvement and innovation.
      </li>
    </ol>
    
  </Col>
      <Col md={6} style={{marginTop:'1.6cm'}}>
    <Image
      src={image3}
      alt="Yucca Values"
      fluid
    />
  </Col>
</Row>

  

<Row className="align-items-center my-5">

  <Col md={6}>
    <Image
      src={cows}
      alt="Cows"
      fluid
      style={{
        
      maxHeight: '50', 
      width: '500px',
      objectFit: 'contain',
    }}
    />
  </Col>

 
  <Col md={6} style={{ backgroundColor: '#f2fff2', padding: '40px', paddingTop:''}}>
    <h5 className="text-dark mb-3">
      Our expertise
    
    </h5>

    <p className="mb-4">We expertise in a variety which are;</p>

    <ul className="list-unstyled" style={{textAlign:'left'}}>
      <li className="mb-2">• Agribusiness development</li>
      <li className="mb-2">• Value chain</li>
      <li className="mb-2">• Agritech Solutions</li>
      <li className="mb-2">• Environmental consulting</li>
      <li className="mb-2">• Socio Economic Research and Analysis</li>
      <li className="mb-2">• Capacity Building and Training</li>
    </ul>
  </Col>
</Row>

    </Container>
    
  );
};

export default About;


