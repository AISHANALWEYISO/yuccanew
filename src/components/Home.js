// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import ser from '../images/ser.jpg';
// import goats from '../images/goats.jpg';
// import postharvest from '../images/posthavest.jpg';
// import comidity from '../images/commodity.jpeg';
// import food from '../images/food.jpg';
// import irrigation from '../images/irrigation.jpg';
// import logot from '../images/LOGOT.png';
// import bean from '../images/beans.jpg';
// import rice from '../images/rice.jpeg'
// import soya from '../images/soya.jpeg'
// import nest from '../images/nest.png'
// import home from "../images/home.jpg"


// const Home = () => {
//   const products = [
//     { name: 'beens', image: bean },
//     { name: 'soya', image: soya },
//     { name: 'rice', image: rice },
//   ];

//   return (
//   <div style={{ margin: 0, padding: 0 }}>
//   {/* Hero Section - Static Full Image */}
//   <div
//     style={{
//       backgroundImage: `url(${home})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center center',
//       backgroundRepeat: 'no-repeat',
//       height: '100vh', // Full height of viewport
//       width: '100vw',  // Full width of viewport
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'flex-start',
//       paddingTop:'5cm'
//     }}
//       >
//         <h1
//           style={{
//             color: 'white',
//             fontStyle:'revert-layer',
//             fontSize: '2rem',
//             fontWeight: 'small',
//             textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
//             textAlign:'center',
//             marginTop:'1rem'
//           }}
//         >
//           Cultivating a sustainable world
//         </h1>
//       </div>

//       {/* Intro Section */}
//       <Container fluid className="my-5">
//         <Row className="align-items-center justify-content-center">
//           <Col md={6} className="position-relative" style={{ zIndex: 2 }}>
//             <div
//               className="p-4"
//               style={{
//                 backgroundColor: 'rgba(224, 241, 229, 0.9)',
//                 borderRadius: '15px',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                 marginLeft: '2rem',
//                 marginRight: '-4rem',
//               }}
//             >
//               <h5 className="fst-italic mb-2" style={{ color: '#366000' }}>
//                 We are your agricultural partner
//               </h5>
//               <p style={{ fontSize: '1.1rem' }}>
//                 Empowering farmers, communities, and organizations to adopt
//                 sustainable practices, technologies, and innovations that drive
//                 economic growth, environmental stewardship, and social well-being.
//               </p>
//             </div>
//           </Col>
//           <Col md={6}>
//             <img
//               src={irrigation}
//               alt="Farming Support"
//               className="img-fluid rounded-4"
//               style={{
//                 maxHeight: '400px',
//                 objectFit: 'cover',
//                 width: '100%',
//               }}
//             />
//           </Col>
//         </Row>
//       </Container>

//       {/* DEALERS IN Section */}
//       <Container className="my-5 text-center">
//         <h4 className="fw-bold" style={{ borderBottom: '3px solid #366000', display: 'inline-block', paddingBottom: '5px' }}>
//           DEALERS IN
//         </h4>
//         <Row className="mt-4 g-4 justify-content-center">
//           {[{
//             img: ser,
//             title: 'Soil Fertility',
//             text: 'Improves soil fertility through sustainable farming practices.'
//           },
//           {
//             img: goats,
//             title: 'Breeding Practices',
//             text: 'Advises on best breeds for environment and goals.'
//           },
//           {
//             img: postharvest,
//             title: 'Post-harvest',
//             text: 'Improves post-harvest processes to reduce loss and enhance quality.'
//           }].map((item, idx) => (
//             <Col md={4} sm={6} key={idx}>
//               <Card className="p-3 h-100 rounded-3 border-0 shadow-sm">
//                 <Card.Img
//                   variant="top"
//                   src={item.img}
//                   style={{
//                     borderRadius: '20px',
//                     height: '180px',
//                     objectFit: 'cover',
//                   }}
//                   alt={item.title}
//                 />
//                 <Card.Body>
//                   <Card.Title className="fw-bold">{item.title}</Card.Title>
//                   <Card.Text>{item.text}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       {/* OUR INTERVENTIONS */}
//       <Container className="my-5 text-center">
//         <h4 className="fw-bold" style={{ borderBottom: '3px solid #366000', display: 'inline-block', paddingBottom: '5px' }}>
//           OUR INTERVENTIONS
//         </h4>
//         <Row className="mt-4 g-4 justify-content-center">
//           {[{
//             img: comidity,
//             title: 'Strategic commodities',
//             text: 'Provision of planting materials to boost productivity.',
//           },
//           {
//             img: food,
//             title: 'Promoting Food Security',
//             text: 'Ensuring access to adequate food through innovations.',
//           },
//           {
//             img: irrigation,
//             title: 'Irrigation Access',
//             text: 'Providing sustainable water solutions for farming.',
//           }].map((item, i) => (
//             <Col md={4} sm={6} key={i}>
//               <Card className="border-0 h-100 shadow-sm">
//                 <Card.Img
//                   src={item.img}
//                   alt={item.title}
//                   style={{
//                     height: '250px',
//                     objectFit: 'cover',
//                     borderTopLeftRadius: '12px',
//                     borderTopRightRadius: '12px',
//                   }}
//                 />
//                 <div
//                   className="text-white text-start px-3 py-3"
//                   style={{
//                     backgroundColor: '#366000',
//                     borderBottomLeftRadius: '12px',
//                     borderBottomRightRadius: '12px',
//                   }}
//                 >
//                   <h5 className="fw-bold mb-1">{item.title}</h5>
//                   <p className="mb-0">{item.text}</p>
//                 </div>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       {/* Products Section */}
//       <Container className="my-5 text-center">
//         <h4 className="fw-bold" style={{ borderBottom: '3px solid #366000', display: 'inline-block', paddingBottom: '5px' }}>
//           OUR PRODUCTS
//         </h4>
//         <Row className="mt-4 g-4 justify-content-center">
//           {products.map((product, index) => (
//             <Col md={4} sm={6} key={index}>
//               <div className="d-flex flex-column align-items-center">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="mb-3"
//                   style={{
//                     width: '180px',
//                     height: '180px',
//                     borderRadius: '50%',
//                     objectFit: 'cover',
//                     border: '4px solid #366000',
//                   }}
//                 />
//                 <h5 className="fw-bold">{product.name}</h5>
//               </div>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       {/* Partners */}
//       <Container className="my-5 text-center">
//         <h4 className="fw-bold" style={{ borderBottom: '3px solid #366000', display: 'inline-block', paddingBottom: '5px' }}>
//           OUR PARTNERS
//         </h4>
//         <Row className="mt-4 justify-content-center align-items-center g-4">
//           {[logot,nest].map((logo,index) => (
//             <Col key={index} md={3} sm={6} xs={6}>
//               <img
//                 src={logo}
//                 alt={`Partner ${index + 1}`}
//                 className="img-fluid"
//                 style={{ maxHeight: '100px', objectFit: 'contain' }}
//               />
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Card } from 'react-bootstrap';

// const Home = () => {
//   const [intro, setIntro] = useState(null);
//   const [sections, setSections] = useState([]);
//   const [media, setMedia] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHomepageData = async () => {
//       try {
//         const introRes = await axios.get('/api/homepage/intro');
//         setIntro(introRes.data);

//         const sectionsRes = await axios.get('/api/homepage/sections');
//         setSections(sectionsRes.data);

//         const mediaRes = await axios.get('/api/homepage/media');
//         setMedia(mediaRes.data);

//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to load homepage data', error);
//         setLoading(false);
//       }
//     };

//     fetchHomepageData();
//   }, []);

//   if (loading) return <div>Loading homepage...</div>;

//   return (
//     <Container>
//       {/* Intro Section */}
//       {intro && (
//         <section className="my-5">
//           <h1>{intro.title}</h1>
//           <p>{intro.description}</p>
//         </section>
//       )}

//       {/* Sections */}
//       <Row>
//         {sections.map(section => (
//           <Col md={4} key={section.id} className="mb-4">
//             <Card>
//               <Card.Body>
//                 <Card.Title>{section.title}</Card.Title>
//                 <Card.Text>{section.content}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Media Gallery */}
//       <Row>
//         {media.map(item => (
//           <Col md={4} key={item.id} className="mb-4">
//             <Card>
//               <Card.Img variant="top" src={item.image_url} alt={item.caption || 'Media image'} />
//               {item.caption && <Card.Body><Card.Text>{item.caption}</Card.Text></Card.Body>}
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  const [intro, setIntro] = useState(null);
  const [sections, setSections] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const introRes = await axios.get("/api/homepage/intro");
        setIntro(introRes.data);

        const sectionsRes = await axios.get("/api/homepage/sections");
        setSections(sectionsRes.data);

        const mediaRes = await axios.get("/api/homepage/media");
        setMedia(mediaRes.data);

        setLoading(false);
      } catch (error) {
        console.error("Failed to load homepage data", error);
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  if (loading) return <div>Loading homepage...</div>;

  // Helper: Map section headers to their child types
  const sectionTypeMap = {
    "DEALERS IN": "dealer",
    "OUR INTERVENTIONS": "intervention",
    "OUR PRODUCTS": "product",
    "OUR PARTNERS": "partner_logo",
  };

  // Get sections that are headers (e.g., "DEALERS IN")
  const sectionHeaders = sections.filter(
    (s) => s.section_type === "section_header"
  );

  // For each header, get child items matching mapped section_type
  const getChildItems = (headerTitle) => {
    const childType = sectionTypeMap[headerTitle.toUpperCase()] || null;
    if (!childType) return [];
    return sections.filter((s) => s.section_type === childType);
  };

  return (
    <div>
      {/* Hero Section from intro */}
      {intro && (
        <div
          style={{
            backgroundImage: `url(${intro.hero_image_url || "/default-hero.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "5rem",
          }}
        >
          <h1
            style={{
              color: "white",
              fontStyle: "revert-layer",
              fontSize: "3rem",
              fontWeight: "bold",
              textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            {intro.hero_text}
          </h1>
        </div>
      )}

      <Container>
        {/* Intro text section */}
        {intro && (
          <section className="my-5">
            <h5
              className="fst-italic mb-2"
              style={{ color: "#366000" }}
            >
              {intro.intro_title}
            </h5>
            <p style={{ fontSize: "1.1rem" }}>{intro.intro_description}</p>
          </section>
        )}

        {/* Dynamic Sections (Dealers, Interventions, Products, Partners) */}
        {sectionHeaders.map((header) => {
          const children = getChildItems(header.title);
          return (
            <section key={header.id} className="my-5 text-center">
              <h4
                className="fw-bold"
                style={{
                  borderBottom: "3px solid #366000",
                  display: "inline-block",
                  paddingBottom: "5px",
                }}
              >
                {header.title}
              </h4>
              {header.content && <p>{header.content}</p>}

              <Row className="mt-4 g-4 justify-content-center">
                {children.map((item) => (
                  <Col md={4} sm={6} key={item.id}>
                    <Card
                      className={`p-3 h-100 rounded-3 border-0 shadow-sm ${
                        item.section_type === "intervention"
                          ? "text-white"
                          : ""
                      }`}
                      style={
                        item.section_type === "intervention"
                          ? { backgroundColor: "#366000" }
                          : {}
                      }
                    >
                      <Card.Img
                        variant="top"
                        src={item.image_url}
                        alt={item.title}
                        style={{
                          borderRadius:
                            item.section_type === "intervention"
                              ? "12px 12px 0 0"
                              : "20px",
                          height:
                            item.section_type === "intervention"
                              ? "250px"
                              : "180px",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body>
                        <Card.Title className="fw-bold">{item.title}</Card.Title>
                        <Card.Text>{item.content}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          );
        })}

        {/* Partners Gallery */}
        {media.length > 0 && (
          <section className="my-5 text-center">
            <h4
              className="fw-bold"
              style={{
                borderBottom: "3px solid #366000",
                display: "inline-block",
                paddingBottom: "5px",
              }}
            >
              OUR PARTNERS
            </h4>
            <Row className="mt-4 justify-content-center align-items-center g-4">
              {media.map((item) => (
                <Col key={item.id} md={3} sm={6} xs={6}>
                  <img
                    src={item.image_url}
                    alt={item.caption || "Partner"}
                    className="img-fluid"
                    style={{ maxHeight: "100px", objectFit: "contain" }}
                  />
                </Col>
              ))}
            </Row>
          </section>
        )}
      </Container>
    </div>
  );
};

export default Home;
