

// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import axios from "axios";

// const API_HOST = "http://localhost:5000";
// const API_BASE = `${API_HOST}/api/v1/homepage`;

// const Home = () => {
//   const [intro, setIntro] = useState({});
//   const [dealers, setDealers] = useState([]);
//   const [interventions, setInterventions] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [partners, setPartners] = useState([]);

//   useEffect(() => {
//     fetchData("intro", setIntro);
//     fetchData("dealers", setDealers);
//     fetchData("interventions", setInterventions);
//     fetchData("products", setProducts);
//     fetchData("partners", setPartners);
//   }, []);

//   const fetchData = async (endpoint, setter) => {
//     try {
//       const res = await axios.get(`${API_BASE}/${endpoint}`);
//       setter(res.data);
//     } catch (err) {
//       console.error(`Failed to fetch ${endpoint}:`, err);
//     }
//   };

//   return (
//     <div>
//       {/* Hero Section */}
//       {intro.image && (
//         <div
//           style={{
//             backgroundImage: `url(${API_HOST}${intro.image})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             width: "100%",
//             height: "100vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginTop: "-70px", // push it up to touch navbar (adjust to your navbar height)
//             marginLeft:'0',
//             padding:'0',
//           }}
//         >
//           {intro.title && (
//             <h1
//               style={{
//                 color: "white",
//                 fontSize: "2.5rem",
//                 fontWeight: "400",
//                 textAlign: "center",
//                 padding: "0 2rem",
//               }}
//             >
//               {intro.title}
//             </h1>
//           )}
//         </div>
//       )}

//       {/* Intro Rectangle Panel */}
//       {intro.text && (
//         <Container fluid className="my-5">
//           <Row className="justify-content-center">
//             <Col md={6}>
//               <div
//                 style={{
//                   backgroundColor: "rgba(224,241,229,0.9)",
//                   padding: "2rem",
//                   borderRadius: "15px",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                   marginTop: "-5rem", // rectangle overlaps hero image
//                 }}
//               >
//                 <p
//                   style={{
//                     fontSize: "1.1rem",
//                     fontWeight: "400",
//                     textAlign: "center",
//                   }}
//                 >
//                   {intro.text}
//                 </p>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       )}

//       {/* DEALERS IN */}
//       {dealers.length > 0 && (
//         <Container className="my-5 text-center">
//           <h4
//             style={{
//               borderBottom: "3px solid #366000",
//               display: "inline-block",
//               paddingBottom: "5px",
//             }}
//           >
//             DEALERS IN
//           </h4>
//           <Row className="mt-4 g-4 justify-content-center">
//             {dealers.map((item) => (
//               <Col md={4} sm={6} key={item.id}>
//                 <Card className="p-3 h-100 rounded-3 border-0 shadow-sm">
//                   {item.image && (
//                     <Card.Img
//                       variant="top"
//                       src={`${API_HOST}${item.image}`}
//                       style={{
//                         borderRadius: "20px",
//                         height: "180px",
//                         objectFit: "cover",
//                       }}
//                     />
//                   )}
//                   <Card.Body>
//                     <Card.Title className="fw-bold">{item.title}</Card.Title>
//                     <Card.Text>{item.description}</Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       )}

//       {/* Interventions */}
//       {interventions.length > 0 && (
//         <Container className="my-5 text-center">
//           <h4
//             style={{
//               borderBottom: "3px solid #366000",
//               display: "inline-block",
//               paddingBottom: "5px",
//             }}
//           >
//             OUR INTERVENTIONS
//           </h4>
//           <Row className="mt-4 g-4 justify-content-center">
//             {interventions.map((item) => (
//               <Col md={4} sm={6} key={item.id}>
//                 <Card className="border-0 h-100 shadow-sm d-flex flex-column">
//                   {item.image && (
//                     <Card.Img
//                       src={`${API_HOST}${item.image}`}
//                       alt={item.title}
//                       style={{
//                         height: "250px",
//                         objectFit: "cover",
//                         borderTopLeftRadius: "12px",
//                         borderTopRightRadius: "12px",
//                       }}
//                     />
//                   )}
//                   {/* Force equal green box heights */}
//                   <div
//                     style={{
//                       backgroundColor: "#366000",
//                       borderBottomLeftRadius: "12px",
//                       borderBottomRightRadius: "12px",
//                       padding: "1rem",
//                       flexGrow: 1, // make all equal
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <h5 className="fw-bold mb-1 text-white">{item.title}</h5>
//                     <p className="mb-0 text-white">{item.description}</p>
//                   </div>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       )}

//       {/* Products */}
//       {products.length > 0 && (
//         <Container className="my-5 text-center">
//           <h4
//             style={{
//               borderBottom: "3px solid #366000",
//               display: "inline-block",
//               paddingBottom: "5px",
//             }}
//           >
//             OUR PRODUCTS
//           </h4>
//           <Row className="mt-4 g-4 justify-content-center">
//             {products.map((product) => (
//               <Col md={4} sm={6} key={product.id}>
//                 <div className="d-flex flex-column align-items-center">
//                   {product.image && (
//                     <img
//                       src={`${API_HOST}${product.image}`}
//                       alt={product.name}
//                       style={{
//                         width: "180px",
//                         height: "180px",
//                         borderRadius: "50%",
//                         objectFit: "cover",
//                         marginBottom: "1rem",
//                       }}
//                     />
//                   )}
//                   <h5>{product.name}</h5>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       )}

//       {/* Partners */}
//       {partners.length > 0 && (
//         <Container className="my-5 text-center">
//           <h4
//             style={{
//               borderBottom: "3px solid #366000",
//               display: "inline-block",
//               paddingBottom: "5px",
//             }}
//           >
//             OUR PARTNERS
//           </h4>
//           <Row className="mt-4 justify-content-center g-4">
//             {partners.map((partner) => (
//               <Col key={partner.id} md={3} sm={6}>
//                 {partner.logo && (
//                   <img
//                     src={`${API_HOST}${partner.logo}`}
//                     alt={partner.name}
//                     style={{ maxHeight: "100px", objectFit: "contain" }}
//                   />
//                 )}
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       )}
//     </div>
//   );
// };

// export default Home; 

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const API_HOST = "http://localhost:5000";
const API_BASE = `${API_HOST}/api/v1/homepage`;

const Home = () => {
  const [intro, setIntro] = useState({});
  const [dealers, setDealers] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchData("intro", setIntro);
    fetchData("dealers", setDealers);
    fetchData("interventions", setInterventions);
    fetchData("products", setProducts);
    fetchData("partners", setPartners);
  }, []);

  const fetchData = async (endpoint, setter) => {
    try {
      const res = await axios.get(`${API_BASE}/${endpoint}`);
      setter(res.data);
    } catch (err) {
      console.error(`Failed to fetch ${endpoint}:`, err);
    }
  };

  return (
    <div>
      {/* Hero Section - Full Width & Full Height */}
      {intro.image && (
        <div
          style={{
            backgroundImage: `url(${API_HOST}${intro.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
            marginTop: "-70px", // Adjust based on your navbar height
            zIndex: -1,
          }}
        >
          {intro.title && (
            <h1
              style={{
                color: "white",
                fontSize: "2.5rem",
                fontWeight: "400",
                textAlign: "center",
                padding: "0 2rem",
                textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)",
              }}
            >
              {intro.title}
            </h1>
          )}
        </div>
      )}

      {/* Intro Rectangle Panel */}
      {intro.text && (
        <Container fluid className="my-5">
          <Row className="justify-content-center">
            <Col md={6}>
              <div
                style={{
                  backgroundColor: "rgba(224,241,229,0.9)",
                  padding: "2rem",
                  borderRadius: "15px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  marginTop: "-5rem",
                }}
              >
                <p
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                >
                  {intro.text}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      )}

      {/* DEALERS IN */}
      {dealers.length > 0 && (
        <Container className="my-5 text-center">
          <h4
            style={{
              borderBottom: "3px solid #366000",
              display: "inline-block",
              paddingBottom: "5px",
            }}
          >
            DEALERS IN
          </h4>
          <Row className="mt-4 g-4 justify-content-center">
            {dealers.map((item) => (
              <Col md={4} sm={6} key={item.id}>
                <Card className="p-3 h-100 rounded-3 border-0 shadow-sm">
                  {item.image && (
                    <Card.Img
                      variant="top"
                      src={`${API_HOST}${item.image}`}
                      style={{
                        borderRadius: "20px",
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title className="fw-bold">{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* Interventions */}
      {interventions.length > 0 && (
        <Container className="my-5 text-center">
          <h4
            style={{
              borderBottom: "3px solid #366000",
              display: "inline-block",
              paddingBottom: "5px",
            }}
          >
            OUR INTERVENTIONS
          </h4>
          <Row className="mt-4 g-4 justify-content-center">
            {interventions.map((item) => (
              <Col md={4} sm={6} key={item.id}>
                <Card className="border-0 h-100 shadow-sm d-flex flex-column">
                  {item.image && (
                    <Card.Img
                      src={`${API_HOST}${item.image}`}
                      alt={item.title}
                      style={{
                        height: "250px",
                        objectFit: "cover",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    />
                  )}
                  <div
                    style={{
                      backgroundColor: "#366000",
                      borderBottomLeftRadius: "12px",
                      borderBottomRightRadius: "12px",
                      padding: "1rem",
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h5 className="fw-bold mb-1 text-white">{item.title}</h5>
                    <p className="mb-0 text-white">{item.description}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* Products */}
      {products.length > 0 && (
        <Container className="my-5 text-center">
          <h4
            style={{
              borderBottom: "3px solid #366000",
              display: "inline-block",
              paddingBottom: "5px",
            }}
          >
            OUR PRODUCTS
          </h4>
          <Row className="mt-4 g-4 justify-content-center">
            {products.map((product) => (
              <Col md={4} sm={6} key={product.id}>
                <div className="d-flex flex-column align-items-center">
                  {product.image && (
                    <img
                      src={`${API_HOST}${product.image}`}
                      alt={product.name}
                      style={{
                        width: "180px",
                        height: "180px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: "1rem",
                      }}
                    />
                  )}
                  <h5>{product.name}</h5>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* Partners */}
      {partners.length > 0 && (
        <Container className="my-5 text-center">
          <h4
            style={{
              borderBottom: "3px solid #366000",
              display: "inline-block",
              paddingBottom: "5px",
            }}
          >
            OUR PARTNERS
          </h4>
          <Row className="mt-4 justify-content-center g-4">
            {partners.map((partner) => (
              <Col key={partner.id} md={3} sm={6}>
                {partner.logo && (
                  <img
                    src={`${API_HOST}${partner.logo}`}
                    alt={partner.name}
                    style={{ maxHeight: "100px", objectFit: "contain" }}
                  />
                )}
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Home;