import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../images/man.jpg'

const teamMembers = [
  {
    id: 1,
    name: 'Aisha Nalweyiso',
    role: 'Founder & CEO',
    image: image,
    facebook: '#',
    linkedin: 'https://www.linkedin.com/in/nalweyiso-aisha-493b14347/',
    tiktok: '#',
  },
  {
    id: 2,
    name: 'John Okello',
    role: 'Agricultural Expert',
    image: '/images/team2.jpg',
    facebook: '#',
    linkedin: '#',
    tiktok: '#',
  },
  {
    id: 3,
    name: 'Mary Atim',
    role: 'Community Outreach Coordinator',
    image: '/images/team3.jpg',
    facebook: '#',
    linkedin: '#',
    tiktok: '#',
  },
  {
    id: 4,
    name: 'Grace Namara',
    role: 'Finance & Operations',
    image: '/images/team4.jpg',
    facebook: '#',
    linkedin: '#',
    tiktok: '#',
  },
  {
    id: 5,
    name: 'Isaac Odong',
    role: 'IT & Systems Manager',
    image: '/images/team5.jpg',
    facebook: '#',
    linkedin: '#',
    tiktok: '#',
  },
  {
    id: 6,
    name: 'Sarah Laker',
    role: 'Field Support Officer',
    image: '/images/team6.jpg',
    facebook: '#',
    linkedin: '#',
    tiktok: '#',
  },
];

const OurTeam = () => {
  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4" style={{ color: '#366000', fontWeight: 'bold' }}>
        Our Team
      </h2>
      <div className="row">
        {teamMembers.map(member => (
          <div className="col-md-4 mb-4" key={member.id}>
            <div className="card border-0">
              <img
                src={member.image}
                alt={member.name}
                className="rounded-circle mx-auto"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text">{member.role}</p>
                <div className="d-flex justify-content-center gap-3">
                  <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebookF color="#4267B2" size={20} />
                  </a>
                  <a href={member.tiktok} target="_blank" rel="noopener noreferrer">
                    <FaTiktok color="#000" size={20} />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn color="#0e76a8" size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
