import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../images/logo.png"; // replace with your actual logo path

const BookingForm = () => {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    service_id: "",
    date: ""
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

  // Fetch services from backend
  useEffect(() => {
    axios.get(`${API_BASE_URL}/services`)
      .then(res => {
        const activeServices = (res.data.services || []).filter(s => s.service_id);
        setServices(activeServices);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load services.");
      });
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

    if (!form.name || !form.contact || !form.service_id || !form.date) {
      setError("Please fill all fields.");
      return;
    }

    const selectedDate = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError("Preferred date cannot be in the past.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Ensure service exists
      const serviceExists = services.find(s => s.service_id === form.service_id);
      if (!serviceExists) {
        setError("Selected service no longer exists.");
        return;
      }

      const res = await axios.post(
        `${API_BASE_URL}/bookings/create`,
        {
          name: form.name,
          contact: form.contact,
          date: form.date,
          service_id: form.service_id
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );

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
        verification_code: code
      });

      if (res.data.message === "Booking confirmed successfully") {
        setBookingCompleted(true);
        setShowCodeInput(false);
        setVerificationCode(["", "", "", "", "", ""]);
        setBookingId(null);
        setForm({ name: "", contact: "", service_id: "", date: "" });
      }
    } catch (error) {
      setError(error?.response?.data?.error || "Failed to confirm booking.");
    }
  };

  const handleResend = async () => {
    setError("");
    if (!bookingId) {
      setError("No booking to resend code for.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/bookings/resend/${bookingId}`);
      setCountdown(60);
      setSuccess("New code sent.");
    } catch (err) {
      setError("Failed to resend code.");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "90vh",
      backgroundColor: "#F0F5E8",
      padding: "2rem"
    }}>
      {/* Left Side - Logo */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={logo} alt="Logo" style={{ maxWidth: "250px" }} />
      </div>

      {/* Right Side - Booking Form */}
      <div style={{
        flex: 1,
        backgroundColor: "#E7F0D6",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 0 15px rgba(54, 96, 0, 0.3)"
      }}>
        {bookingCompleted ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2 style={{ color: "#366000", fontSize: "28px", marginBottom: "1rem" }}>
              🎉 Thank you for booking our services!
            </h2>
            <a href="/"
               style={{
                 color: "#366000",
                 textDecoration: "none",
                 fontWeight: "bold",
                 fontSize: "18px",
                 cursor: "pointer"
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
                <input type="text" name="name" value={form.name} onChange={handleInputChange} required
                  style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }} />

                <label style={{ color: "#366000" }}>Email or Phone</label>
                <input type="text" name="contact" value={form.contact} onChange={handleInputChange} required
                  style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }} />

                <label style={{ color: "#366000" }}>Select Service</label>
                <select name="service_id" value={form.service_id} onChange={handleInputChange} required
                  style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}>
                  <option value="">-- Choose a service --</option>
                  {services.map(service => (
                    <option key={service.service_id} value={service.service_id}>
                      {service.name} - UGX {service.price}
                    </option>
                  ))}
                </select>

                <label style={{ color: "#366000" }}>Preferred Date</label>
                <input type="date" name="date" value={form.date} onChange={handleInputChange} required
                  min={new Date().toISOString().split("T")[0]}
                  style={{ width: "100%", padding: "10px", marginBottom: "1.5rem", borderRadius: "4px", border: "1px solid #ccc" }} />

                <button onClick={handleBookNow}
                  style={{ width: "100%", backgroundColor: "#366000", color: "white", padding: "14px", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                  Book Now
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
  );
};

export default BookingForm;
