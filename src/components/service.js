



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
    <div className="container mt-3" >
      <h2 className="text-center mb-4" style={{color:'#366000'}}>Our Services</h2>
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
