


import React, { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import axios from "axios";

const API = "http://127.0.0.1:5000/api/v1/team";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setTeamMembers(res.data))
      .catch((err) => console.error("Error fetching team:", err));
  }, []);

  return (
    <div className="container mt-5 text-center" >
      <h2 className="mb-4" style={{ color: "#366000", fontWeight: "bold" }}>
        Meet Our Team
      </h2>

      <div className="row">
        {teamMembers.map((member) => (
          <div className="col-md-4 mb-4" key={member.id}>
            <div className="card border-0 shadow-sm h-100">
              <img
                src={
                  member.image
                    ? `http://127.0.0.1:5000${member.image}`
                    : "http://127.0.0.1:5000/static/default.jpg"
                }
                alt={member.name}
                className="mx-auto mt-3"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                onError={(e) => {
                  e.target.src = "http://127.0.0.1:5000/static/default.jpg";
                }}
              />

              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text">{member.role}</p>

                <div className="d-flex justify-content-center gap-3">
                  {/* X Icon */}
                  <a
                    href={member.twitter || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <span style={{ fontWeight: "bold", fontSize: "20px" }}>X</span>
                  </a>

                  {/* LinkedIn Icon */}
                  <a
                    href={member.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <FaLinkedinIn size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hover and color effect for icons */}
      <style jsx>{`
        .social-icon svg,
        .social-icon span {
          color: #366000;                /* default green */
          transition: transform 0.3s, color 0.3s;
        }
        .social-icon:hover svg,
        .social-icon:hover span {
          transform: scale(1.3);          /* enlarge on hover */
          color: #1e4000;                 /* slightly darker green on hover */
        }
      `}</style>
    </div>
  );
};

export default Team;
