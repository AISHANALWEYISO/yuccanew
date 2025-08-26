

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { Table, Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
// import { FaTrash, FaPen, FaDownload, FaSearch } from "react-icons/fa";

// const API_BASE = "http://localhost:5000/api/v1/bookings";

// const BookingsDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [editingBooking, setEditingBooking] = useState(null);
//   const [formData, setFormData] = useState({ status: "", is_verified: false });

//   const [search, setSearch] = useState(""); // user typed value
//   const [searchDate, setSearchDate] = useState(""); // separate date input (YYYY-MM-DD)
//   const [isSearching, setIsSearching] = useState(false);

//   const token = localStorage.getItem("token");

//   // Fetch all bookings (unfiltered)
//   const fetchAllBookings = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBookings(res.data.bookings || []);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchAllBookings();
//   }, [fetchAllBookings]);

//   // Search function that calls backend /search
//   const performSearch = useCallback(
//     async (codeQuery, dateQuery) => {
//       setIsSearching(true);
//       try {
//         const params = {};
//         if (codeQuery) params.code = codeQuery;
//         if (dateQuery) params.date = dateQuery;

//         // If no params, fetch all
//         const url = Object.keys(params).length === 0 ? `${API_BASE}/` : `${API_BASE}/search`;

//         const res = await axios.get(url, {
//           params,
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBookings(res.data.bookings || []);
//       } catch (err) {
//         console.error("Search error:", err);
//       } finally {
//         setIsSearching(false);
//       }
//     },
//     [token]
//   );

//   // debounce search: when search or searchDate changes, wait 500ms then call backend
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       // If both empty, fetch all
//       if (!search && !searchDate) {
//         fetchAllBookings();
//       } else {
//         // If user typed something that looks like a date and no date input, you can also pass it as date param.
//         performSearch(search, searchDate);
//       }
//     }, 500);

//     return () => clearTimeout(handler);
//   }, [search, searchDate, performSearch, fetchAllBookings]);

//   // Handle open modal for edit
//   const handleEdit = (booking) => {
//     setEditingBooking(booking);
//     setFormData({ status: booking.status, is_verified: booking.is_verified });
//     setShowModal(true);
//   };

//   // Handle delete booking
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) return;
//     try {
//       await axios.delete(`${API_BASE}/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBookings((prev) => prev.filter((b) => b.booking_id !== id));
//     } catch (err) {
//       console.error("Error deleting booking:", err);
//       alert("Delete failed. Check console.");
//     }
//   };

//   // Handle update booking
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.put(`${API_BASE}/edit/${editingBooking.booking_id}`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       await performSearch(search, searchDate); // refresh results with current filters
//       setShowModal(false);
//     } catch (err) {
//       console.error("Error updating booking:", err);
//       alert("Update failed. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // CSV download (current displayed bookings)
//   const downloadCSV = () => {
//     const headers = [
//       "Booking ID",
//       "Guest Name",
//       "Contact",
//       "Service",
//       "Price",
//       "Preferred Date",
//       "Status",
//       "Verified",
//       "Reference Code",
//     ];
//     const rows = bookings.map((b) => [
//       b.booking_id,
//       b.guest_name,
//       b.guest_contact,
//       b.service,
//       b.price,
//       b.preferred_date,
//       b.status,
//       b.is_verified ? "Yes" : "No",
//       b.reference_code,
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((row) => row.map(String).map(v => `"${v.replace(/"/g,'""')}"`).join(",")).join("\n");
//     const link = document.createElement("a");
//     link.href = encodeURI(csvContent);
//     link.download = "bookings.csv";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="container mt-4">
//       <h2 style={{ color: "#366000" }}>Bookings Management</h2>

//       {/* Search Row */}
//       <Row className="mb-3 align-items-center">
//         <Col md={6}>
//           <InputGroup>
//             <InputGroup.Text><FaSearch /></InputGroup.Text>
//             <Form.Control
//               type="text"
//               placeholder="Search by Reference Code (partial allowed)"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </InputGroup>
//         </Col>

//         <Col md={3}>
//           <Form.Control
//             type="date"
//             placeholder="Preferred Date"
//             value={searchDate}
//             onChange={(e) => setSearchDate(e.target.value)}
//           />
//         </Col>

//         <Col md={3} className="text-end">
//           <Button
//             onClick={() => { setSearch(""); setSearchDate(""); fetchAllBookings(); }}
//             variant="outline-secondary"
//             style={{ marginRight: 8 }}
//           >
//             Clear
//           </Button>
//           <Button
//             onClick={downloadCSV}
//             style={{
//               backgroundColor: "#366000",
//               borderColor: "#366000",
//             }}
//           >
//             <FaDownload /> Download CSV
//           </Button>
//         </Col>
//       </Row>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Contact</th>
//             <th>Service</th>
//             <th>Price</th>
//             <th>Preferred Date</th>
//             <th>Status</th>
//             <th>Verified</th>
//             <th>Reference Code</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           { (isSearching || loading) && bookings.length === 0 ? (
//             <tr><td colSpan="10" className="text-center">Loading...</td></tr>
//           ) : bookings.length === 0 ? (
//             <tr><td colSpan="10" className="text-center">No bookings found.</td></tr>
//           ) : (
//             bookings.map((b) => (
//               <tr key={b.booking_id}>
//                 <td>{b.booking_id}</td>
//                 <td>{b.guest_name}</td>
//                 <td>{b.guest_contact}</td>
//                 <td>{b.service}</td>
//                 <td>{b.price}</td>
//                 <td>{b.preferred_date}</td>
//                 <td>{b.status}</td>
//                 <td>{b.is_verified ? "✅" : "❌"}</td>
//                 <td>{b.reference_code}</td>
//                 <td>
//                   <FaPen
//                     style={{ cursor: "pointer", color: "#366000", marginRight: "10px" }}
//                     onClick={() => handleEdit(b)}
//                   />
//                   <FaTrash
//                     style={{ cursor: "pointer", color: "#dc3545" }}
//                     onClick={() => handleDelete(b.booking_id)}
//                   />
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>

//       {/* Edit Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Booking</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             <Form.Group className="mb-2">
//               <Form.Label>Status</Form.Label>
//               <Form.Select
//                 value={formData.status}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//               >
//                 <option value="pending">Pending</option>
//                 <option value="paid">Paid</option>
//                 <option value="expired">Expired</option>
//                 <option value="completed">Completed</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Check
//                 type="checkbox"
//                 label="Verified"
//                 checked={formData.is_verified}
//                 onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
//               />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Close
//             </Button>
//             <Button
//               type="submit"
//               style={{ backgroundColor: "#366000", borderColor: "#366000" }}
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save"}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default BookingsDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaPen, FaTrash } from "react-icons/fa";

const API_BASE = "http://localhost:5000/api/v1"; // Flask backend URL

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [page] = useState(1);
  const [limit] = useState(50);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [formData, setFormData] = useState({
    guest_name: "",
    guest_contact: "",
    status: "",
    preferred_date: "",
  });

  const token = localStorage.getItem("token");

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = { page, limit };
      if (statusFilter) params.status = statusFilter;
      if (dateFilter) params.date = dateFilter;

      const res = await axios.get(`${API_BASE}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setBookings(res.data.bookings);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, dateFilter]);

  const handleEdit = (booking) => {
    setCurrentBooking(booking);
    setFormData({
      guest_name: booking.guest_name,
      guest_contact: booking.guest_contact,
      status: booking.status,
      preferred_date: booking.preferred_date,
    });
    setShowEdit(true);
  };

  const handleClose = () => setShowEdit(false);

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE}/bookings/${currentBooking.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking updated successfully");
      fetchBookings();
      setShowEdit(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`${API_BASE}/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking deleted successfully");
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete booking");
    }
  };

  const clearFilters = () => {
    setStatusFilter("");
    setDateFilter("");
  };

  const handleDownload = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (dateFilter) params.date = dateFilter;

      const res = await axios.get(`${API_BASE}/bookings/download`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bookings.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      toast.error("Failed to download CSV");
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="my-3">Bookings Management</h3>

      {/* Filters & Actions */}
      <div className="d-flex flex-wrap align-items-center mb-3 gap-2">
        <Form.Control
          type="text"
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: "200px" }}
        />
        <Form.Control
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{ maxWidth: "200px" }}
        />
        <Button variant="secondary" onClick={clearFilters}>
          Clear
        </Button>
        <Button
          style={{ backgroundColor: "#366000", borderColor: "#366000" }}
          onClick={handleDownload}
        >
          Download Bookings
        </Button>
      </div>

      {/* Bookings Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center">
                Loading...
              </td>
            </tr>
          ) : bookings.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.guest_name}</td>
                <td>{b.guest_contact}</td>
                <td>{b.service?.name || "-"}</td>
                <td>{b.preferred_date}</td>
                <td>{b.status}</td>
                <td>{b.is_verified ? "Yes" : "No"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="link"
                    className="p-0 me-2"
                    style={{ color: "#366000" }}
                    onClick={() => handleEdit(b)}
                  >
                    <FaPen />
                  </Button>
                  <Button
                    size="sm"
                    variant="link"
                    className="p-0 text-danger"
                    onClick={() => handleDelete(b.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.guest_name}
                onChange={(e) =>
                  setFormData({ ...formData, guest_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={formData.guest_contact}
                onChange={(e) =>
                  setFormData({ ...formData, guest_contact: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Preferred Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.preferred_date}
                onChange={(e) =>
                  setFormData({ ...formData, preferred_date: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingDashboard;
