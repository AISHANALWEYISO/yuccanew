// import React, { useState } from 'react';
// import image2 from '../images/image2.jpg'

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     message: '',
//   });

 

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add API call here to submit formData

//     // setStatus('Thanks for joining us!');
//     setFormData({ firstName: '', lastName: '', email: '', message: '' });
//   };

//   return (
//     <div className="container mt-5 w-full h-[762px] object-cover">
//       <div>      {/* Image at top with fixed height ~5cm */}
//       <div style={{ height: '5cm', overflow: 'hidden', marginBottom: '1.5rem' }}>
//         <img
//           src={image2} // put your image path here
//           alt="Contact banner"
//           style={{ 
//             width: '100%', 
//             height: '100%', 
//             objectFit: 'cover', 
//             paddingTop:''
//           }} 
//         />
//       </div>
// </div>
//       <h2 className="text-center mb-4" style={{color:'#366000'}}>Let’s Grow Our Environment Together </h2>
//       <div className="row justify-content-center">
//         <div className="col-md-10 col-lg-8">
//           <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label htmlFor="firstName" className="form-label">
             
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   className="form-control"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                   placeholder="First Name"
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label htmlFor="lastName" className="form-label">
                 
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   className="form-control"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                   placeholder="Last Name"
//                 />
//               </div>
//             </div>

//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
         
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Email"
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="message" className="form-label">
              
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 className="form-control"
//                 rows="5"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 placeholder="Message...."
//               />
//             </div>

//             <button type="submit" style={{backgroundColor:'#366000',width:'43rem', borderRadius:'10px', color:'white'}}>
//               Submit
//             </button>
//           </form>

         
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useState } from 'react';
import axios from 'axios';
import image2 from '../images/image2.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    contact: '', // for email or phone
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       await axios.post('http://127.0.0.1:5000/api/v1/contact/create', formData);
      setStatus('Message sent successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        contact: '',
        message: '',
      });
    } catch (error) {
      setStatus('Failed to send message. Try again.');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5 w-full h-auto">
      {/* Image Banner */}
      <div style={{ height: '5cm', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <img
          src={image2}
          alt="Contact banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      <h2 className="text-center mb-4" style={{ color: '#366000' }}>
        Let’s Grow Our Environment Together
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="contact"
                className="form-control"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Email or Phone"
              />
            </div>

            <div className="mb-3">
              <textarea
                name="message"
                className="form-control"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Message..."
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#366000',
                width: '100%',
                borderRadius: '10px',
                color: 'white',
                padding: '10px',
                fontWeight: 'bold'
              }}
            >
              Submit
            </button>

            {status && (
              <p className="mt-3 text-center" style={{ color: status.includes('success') ? 'green' : 'red' }}>
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
