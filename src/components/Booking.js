

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import logo from "../images/logo1.png"; // replace with your actual logo path

// const Booking = () => {
//   const [form, setForm] = useState({
//     guest_name: "",
//     contact: "",
//     service_id: "",
//     preferred_date: ""
//   });

//   const [services, setServices] = useState([]);
//   const [showCodeInput, setShowCodeInput] = useState(false);
//   const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
//   const [bookingId, setBookingId] = useState(null);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [countdown, setCountdown] = useState(60);
//   const [codeSentTo, setCodeSentTo] = useState("");
//   const [bookingCompleted, setBookingCompleted] = useState(false);

//   const API_BASE_URL = "http://localhost:5000/api/v1";

//   // Fetch services dynamically
//   const fetchServices = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/services`);
//       const activeServices = Array.isArray(res.data.services) ? res.data.services : [];
//       setServices(activeServices);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load services.");
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   // Countdown for verification
//   useEffect(() => {
//     if (showCodeInput && countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [showCodeInput, countdown]);

//   const handleInputChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleCodeChange = (index, value) => {
//     if (value.length > 1) return;
//     const newCode = [...verificationCode];
//     newCode[index] = value;
//     setVerificationCode(newCode);

//     if (value && index < 5) {
//       const nextInput = document.getElementById(`code-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const handleBookNow = async () => {
//     setError("");
//     setSuccess("");

//     if (!form.guest_name || !form.contact || !form.service_id || !form.preferred_date) {
//       setError("Please fill all fields.");
//       return;
//     }

//     const selectedDate = new Date(form.preferred_date);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     if (selectedDate < today) {
//       setError("Preferred date cannot be in the past.");
//       return;
//     }

//     try {
//       const serviceExists = services.find(s => s.id === parseInt(form.service_id));
//       if (!serviceExists) {
//         setError("Selected service no longer exists.");
//         return;
//       }

//       const res = await axios.post(`${API_BASE_URL}/bookings/create`, form);

//       setBookingId(res.data.booking_id);
//       setShowCodeInput(true);
//       setCountdown(60);
//       setCodeSentTo(form.contact.includes("@") ? "email" : "SMS");
//     } catch (err) {
//       setError(err?.response?.data?.error || "Booking failed.");
//     }
//   };

//   const handleConfirmBooking = async () => {
//     setError("");
//     setSuccess("");

//     const code = verificationCode.join("");
//     if (code.length < 6) {
//       setError("Please enter the 6-digit verification code.");
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_BASE_URL}/bookings/verify/${bookingId}`, {
//         code // ✅ backend expects "code"
//       });

//       if (res.data.message === "Booking verified successfully") {
//         setBookingCompleted(true);
//         setShowCodeInput(false);
//         setVerificationCode(["", "", "", "", "", ""]);
//         setBookingId(null);
//         setForm({ guest_name: "", contact: "", service_id: "", preferred_date: "" });

//         fetchServices();
//       }
//     } catch (error) {
//       setError(error?.response?.data?.error || "Failed to confirm booking.");
//     }
//   };

//   const handleResend = async () => {
//     setError("");
//     if (!bookingId) {
//       setError("No booking to resend code for.");
//       return;
//     }

//     try {
//       await axios.post(`${API_BASE_URL}/bookings/resend/${bookingId}`);
//       setCountdown(60);
//       setSuccess("New code sent.");
//     } catch (err) {
//       setError("Failed to resend code.");
//     }
//   };

//   return (
//     <div style={{ padding: "2rem", backgroundColor: "#F0F5E8", minHeight: "100vh" }}>
//       {/* Payment Cards */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
//         <div style={{
//           backgroundColor: "#ad2218ff", color: "white", padding: "1rem 2rem", borderRadius: "8px",
//           boxShadow: "0 4px 6px rgba(0,0,0,0.1)", textAlign: "center", flex: 1
//         }}>
//           <h3>Airtel</h3>
//           <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>0750163604</p>
//         </div>
//         <div style={{
//           backgroundColor: "#d1b725ff", color: "#000", padding: "1rem 2rem", borderRadius: "8px",
//           boxShadow: "0 4px 6px rgba(0,0,0,0.1)", textAlign: "center", flex: 1
//         }}>
//           <h3>MTN</h3>
//           <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>0766753527</p>
//         </div>
//       </div>

//       <p style={{ textAlign: "center", fontWeight: "bold", marginBottom: "2rem", color: "#366000" }}>
//         Make payment via these mobile money numbers
//       </p>

//       {/* Form & Logo */}
//       <div style={{
//         display: "flex", justifyContent: "center", alignItems: "center",
//         minHeight: "80vh", padding: "2rem"
//       }}>
//         {/* Left Side - Logo */}
//         <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
//           <img src={logo} alt="Logo" style={{ maxWidth: "250px" }} />
//         </div>

//         {/* Right Side - Booking Form */}
//         <div style={{
//           flex: 1, backgroundColor: "#E7F0D6", padding: "2rem", borderRadius: "8px",
//           boxShadow: "0 0 15px rgba(54, 96, 0, 0.3)"
//         }}>
//           {bookingCompleted ? (
//             <div style={{ textAlign: "center", padding: "2rem" }}>
//               <h2 style={{ color: "#366000", fontSize: "28px", marginBottom: "1rem" }}>
//                  Thank you for booking our services!
//               </h2>
//               <a href="/"
//                  style={{
//                    color: "#366000", textDecoration: "none", fontWeight: "bold",
//                    fontSize: "18px", cursor: "pointer"
//                  }}
//                  onMouseEnter={e => e.target.style.textDecoration = "underline"}
//                  onMouseLeave={e => e.target.style.textDecoration = "none"}
//               >
//                 Back to Home
//               </a>
//             </div>
//           ) : (
//             <>
//               <h2 style={{ color: "#366000", textAlign: "center", marginBottom: "1.5rem" }}>Book a Service</h2>

//               {success && <div style={{ color: "green", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}>{success}</div>}
//               {error && <div style={{ color: "red", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}

//               {!showCodeInput ? (
//                 <>
//                   <label style={{ color: "#366000" }}>Full Name</label>
//                   <input type="text" name="guest_name" value={form.guest_name} onChange={handleInputChange} required
//                     style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }} />

//                   <label style={{ color: "#366000" }}>Email--</label>
//                   <input type="text" name="contact" value={form.contact} onChange={handleInputChange} required
//                     style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }} />

//                   <label style={{ color: "#366000" }}>Select Service</label>
//                   <select name="service_id" value={form.service_id} onChange={handleInputChange} required
//                     style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}>
//                     <option value="">-- Choose a service --</option>
//                     {Array.isArray(services) && services.map((s) => (
//                       <option key={s.id} value={s.id}>
//                         {s.name} - UGX {s.price}
//                       </option>
//                     ))}
//                   </select>

//                   <label style={{ color: "#366000" }}>Preferred Date</label>
//                   <input type="date" name="preferred_date" value={form.preferred_date} onChange={handleInputChange} required
//                     min={new Date().toISOString().split("T")[0]}
//                     style={{ width: "100%", padding: "10px", marginBottom: "1.5rem", borderRadius: "4px", border: "1px solid #ccc" }} />

//                   <button onClick={handleBookNow}
//                     style={{ width: "100%", backgroundColor: "#366000", color: "white", padding: "14px", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: "pointer" }}>
//                     Book Service
//                   </button>
//                 </>
//               ) : (
//                 <div style={{ padding: "1.5rem", borderRadius: "8px", textAlign: "center", backgroundColor: "#f9fff0" }}>
//                   <h3 style={{ color: "#366000", marginBottom: "0.5rem" }}>Enter Verification Code</h3>

//                   <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "1rem" }}>
//                     {verificationCode.map((digit, index) => (
//                       <input key={index} id={`code-${index}`} type="text" maxLength={1} value={digit} onChange={(e) => handleCodeChange(index, e.target.value)}
//                         style={{ width: "40px", height: "40px", fontSize: "24px", textAlign: "center", borderRadius: "6px", border: "1px solid #366000" }} />
//                     ))}
//                   </div>

//                   <p style={{ color: "#366000", marginBottom: "1rem" }}>
//                     Code sent via <strong>{codeSentTo}</strong>.{" "}
//                     {countdown > 0 ? <>Expires in {countdown} seconds</> :
//                       <button onClick={handleResend} style={{ color: "#366000", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>Resend Code</button>}
//                   </p>

//                   <button onClick={handleConfirmBooking}
//                     style={{ width: "100%", backgroundColor: "#274800", color: "white", padding: "14px", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: "pointer" }}>
//                     Confirm Booking
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../images/logo1.png"; // replace with your actual logo path

const Booking = () => {
  const [form, setForm] = useState({
    guest_name: "",
    contact: "",
    service_id: "",
    preferred_date: ""
  });

  const [services, setServices] = useState([]);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [bookingId, setBookingId] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [codeSentTo, setCodeSentTo] = useState("");
  const [bookingCompleted, setBookingCompleted] = useState(false);

  const API_BASE_URL = "http://localhost:5000/api/v1";

  // Fetch services dynamically
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/services`);
      const activeServices = Array.isArray(res.data.services) ? res.data.services : [];
      setServices(activeServices);
    } catch (err) {
      console.error(err);
      setError("Failed to load services.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Countdown for verification
  useEffect(() => {
    if (showCodeInput && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showCodeInput, countdown]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleBookNow = async () => {
    setError("");
    setSuccess("");

    if (!form.guest_name || !form.contact || !form.service_id || !form.preferred_date) {
      setError("Please fill all fields.");
      return;
    }

    const selectedDate = new Date(form.preferred_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError("Preferred date cannot be in the past.");
      return;
    }

    try {
      const serviceExists = services.find(s => s.id === parseInt(form.service_id));
      if (!serviceExists) {
        setError("Selected service no longer exists.");
        return;
      }

      const res = await axios.post(`${API_BASE_URL}/bookings/create`, form);

      setBookingId(res.data.booking_id);
      setShowCodeInput(true);
      setCountdown(60);
      setCodeSentTo(form.contact.includes("@") ? "email" : "SMS");
    } catch (err) {
      setError(err?.response?.data?.error || "Booking failed.");
    }
  };

  const handleConfirmBooking = async () => {
    setError("");
    setSuccess("");

    const code = verificationCode.join("");
    if (code.length < 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/bookings/verify/${bookingId}`, {
        code // ✅ backend expects "code"
      });

      if (res.data.message === "Booking verified successfully") {
        setBookingCompleted(true);
        setShowCodeInput(false);
        setVerificationCode(["", "", "", "", "", ""]);
        setBookingId(null);
        setForm({ guest_name: "", contact: "", service_id: "", preferred_date: "" });

        fetchServices();
      }
    } catch (error) {
      setError(error?.response?.data?.error || "Failed to confirm booking.");
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");

    if (!bookingId) {
      setError("No booking to resend code for.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/bookings/resend/${bookingId}`);
      setCountdown(60);
      setSuccess(res.data.message || "New code sent.");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to resend code.");
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#F0F5E8", minHeight: "100vh" }}>
      {/* Payment Cards */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
        <div style={{
          backgroundColor: "#ad2218ff", color: "white", padding: "1rem 2rem", borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)", textAlign: "center", flex: 1
        }}>
          <h3>Airtel</h3>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>0705570825</p>
        </div>
        <div style={{
          backgroundColor: "#d1b725ff", color: "#000", padding: "1rem 2rem", borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)", textAlign: "center", flex: 1
        }}>
          <h3>MTN</h3>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>0784216050</p>
        </div>
      </div>

      <p style={{ textAlign: "center", fontWeight: "bold", marginBottom: "2rem", color: "#366000" }}>
        Make payment via these mobile money numbers
      </p>

      {/* Form & Logo */}
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        minHeight: "80vh", padding: "2rem"
      }}>
        {/* Left Side - Logo */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ maxWidth: "250px" }} />
        </div>

        {/* Right Side - Booking Form */}
        <div style={{
          flex: 1, backgroundColor: "#E7F0D6", padding: "2rem", borderRadius: "8px",
          boxShadow: "0 0 15px rgba(54, 96, 0, 0.3)"
        }}>
          {bookingCompleted ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h2 style={{ color: "#366000", fontSize: "28px", marginBottom: "1rem" }}>
                Thank you for booking our services!
              </h2>
              <a href="/"
                 style={{
                   color: "#366000", textDecoration: "none", fontWeight: "bold",
                   fontSize: "18px", cursor: "pointer"
                 }}
                 onMouseEnter={e => e.target.style.textDecoration = "underline"}
                 onMouseLeave={e => e.target.style.textDecoration = "none"}
              >
                Back to Home
              </a>
            </div>
          ) : (
            <>
              <h2 style={{ color: "#366000", textAlign: "center", marginBottom: "1.5rem" }}>Book a Service</h2>

              {success && <div style={{ color: "green", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}>{success}</div>}
              {error && <div style={{ color: "red", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}

              {!showCodeInput ? (
                <>
                  <label style={{ color: "#366000" }}>Full Name</label>
                  <input type="text" name="guest_name" value={form.guest_name} onChange={handleInputChange} required
                    style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }} />

                  <label style={{ color: "#366000" }}>Email --</label>
                  <input type="text" name="contact" value={form.contact} onChange={handleInputChange} required
                    style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }} />

                  <label style={{ color: "#366000" }}>Select Service</label>
                  <select name="service_id" value={form.service_id} onChange={handleInputChange} required
                    style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}>
                    <option value="">-- Choose a service --</option>
                    {Array.isArray(services) && services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} - UGX {s.price}
                      </option>
                    ))}
                  </select>

                  <label style={{ color: "#366000" }}>Preferred Date</label>
                  <input type="date" name="preferred_date" value={form.preferred_date} onChange={handleInputChange} required
                    min={new Date().toISOString().split("T")[0]}
                    style={{ width: "100%", padding: "10px", marginBottom: "1.5rem", borderRadius: "4px", border: "1px solid #ccc" }} />

                  <button onClick={handleBookNow}
                    style={{ width: "100%", backgroundColor: "#366000", color: "white", padding: "14px", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                    Book Service
                  </button>
                </>
              ) : (
                <div style={{ padding: "1.5rem", borderRadius: "8px", textAlign: "center", backgroundColor: "#f9fff0" }}>
                  <h3 style={{ color: "#366000", marginBottom: "0.5rem" }}>Enter Verification Code</h3>

                  <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "1rem" }}>
                    {verificationCode.map((digit, index) => (
                      <input key={index} id={`code-${index}`} type="text" maxLength={1} value={digit} onChange={(e) => handleCodeChange(index, e.target.value)}
                        style={{ width: "40px", height: "40px", fontSize: "24px", textAlign: "center", borderRadius: "6px", border: "1px solid #366000" }} />
                    ))}
                  </div>

                  <p style={{ color: "#366000", marginBottom: "1rem" }}>
                    Code sent via <strong>{codeSentTo}</strong>.{" "}
                    {countdown > 0 ? <>Expires in {countdown} seconds</> :
                      <button onClick={handleResend} style={{ color: "#366000", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>Resend Code</button>}
                  </p>

                  <button onClick={handleConfirmBooking}
                    style={{ width: "100%", backgroundColor: "#274800", color: "white", padding: "14px", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                    Confirm Booking
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
