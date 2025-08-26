import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Container, Form, InputGroup } from 'react-bootstrap';
import { FaTrash, FaDownload } from 'react-icons/fa';

const ContactMessagesPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/v1/contact/');
      setContacts(res.data.contacts);
      setFilteredContacts(res.data.contacts);
    } catch (err) {
      console.error('Error fetching contact messages:', err);
      setError('Failed to fetch contact messages');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = contacts.filter(c =>
      c.first_name.toLowerCase().includes(term) ||
      c.last_name.toLowerCase().includes(term) ||
      c.contact.toLowerCase().includes(term) ||
      c.message.toLowerCase().includes(term)
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/v1/contact/delete/${selectedId}`);
      setMessage('Message deleted successfully');
      setShowModal(false);
      fetchMessages();
    } catch (err) {
      console.error(err);
      setError('Failed to delete message');
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Contact', 'Message', 'Received At'];
    const rows = filteredContacts.map(c => [
      `${c.first_name} ${c.last_name}`,
      c.contact,
      c.message.replace(/\n/g, ' '),
      new Date(c.created_at).toLocaleString()
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,' +
      headers.join(',') + '\n' +
      rows.map(row => row.map(value => `"${value}"`).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'contact_messages.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Contact Messages</h3>
        <Button variant="success" onClick={exportToCSV}><FaDownload className="me-2" />Export CSV</Button>
      </div>

      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name, contact, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Message</th>
            <th>Received At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No messages found</td>
            </tr>
          ) : (
            filteredContacts.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td>{c.first_name} {c.last_name}</td>
                <td>{c.contact}</td>
                <td>{c.message}</td>
                <td>{new Date(c.created_at).toLocaleString()}</td>
                <td>
                  <FaTrash
                    style={{ color: 'red', cursor: 'pointer' }}
                    title="Delete"
                    onClick={() => handleDeleteClick(c.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Confirm Delete Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this message?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ContactMessagesPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaReply, FaTrash } from 'react-icons/fa';

// const ContactDashboard = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [replyModal, setReplyModal] = useState({ open: false, id: null });
//   const [replyText, setReplyText] = useState('');

//   const token = localStorage.getItem('token');

//   const fetchMessages = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('http://127.0.0.1:5000/api/v1/contact/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.status === 200) {
//         setMessages(res.data.contacts || []);
//       } else {
//         setError('Failed to fetch messages.');
//       }
//     } catch (err) {
//       setError('Server error. Please try later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, );

//   const openReplyModal = (id) => {
//     setReplyModal({ open: true, id });
//     setReplyText('');
//   };

//   const closeReplyModal = () => {
//     setReplyModal({ open: false, id: null });
//     setReplyText('');
//   };

//   const submitReply = async () => {
//     if (!replyText.trim()) return alert('Reply cannot be empty.');

//     try {
//       const res = await axios.patch(
//         `http://127.0.0.1:5000/api/v1/contact/reply/${replyModal.id}`,
//         { reply: replyText },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (res.status === 200) {
//         setMessages(prev =>
//           prev.map(m => (m.id === replyModal.id ? { ...m, reply: replyText } : m))
//         );
//         alert('Reply sent successfully!');
//         closeReplyModal();
//       } else {
//         alert('Failed to send reply.');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Failed to send reply.');
//     }
//   };

//   const deleteMessage = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this message?')) return;

//     try {
//       const res = await axios.delete(`http://127.0.0.1:5000/api/v1/contact/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.status === 200) {
//         setMessages(prev => prev.filter(m => m.id !== id));
//         alert('Message deleted.');
//       } else {
//         alert('Failed to delete message.');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete message.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 1200, margin: 'auto', padding: 20 }}>
//       <h2 style={{ color: '#366000', textAlign: 'center', marginBottom: 20 }}>Contact Messages</h2>

//       {loading && <p>Loading messages...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {!loading && !error && messages.length === 0 && (
//         <p style={{ textAlign: 'center' }}>No messages yet.</p>
//       )}

//       {!loading && !error && (
//         <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#f5fdf2' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#e0f0d9' }}>
//               <th style={{ padding: 10, border: '1px solid #ccc' }}>Name</th>
//               <th style={{ padding: 10, border: '1px solid #ccc' }}>Contact</th>
//               <th style={{ padding: 10, border: '1px solid #ccc' }}>Message</th>
//               <th style={{ padding: 10, border: '1px solid #ccc' }}>Date</th>
//               <th style={{ padding: 10, border: '1px solid #ccc' }}>Reply</th>
//               <th style={{ padding: 10, border: '1px solid #ccc' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {messages.map(({ id, first_name, last_name, contact, message, reply, created_at }) => (
//               <tr key={id}>
//                 <td style={{ padding: 10, border: '1px solid #ccc' }}>{first_name} {last_name}</td>
//                 <td style={{ padding: 10, border: '1px solid #ccc' }}>{contact}</td>
//                 <td style={{ padding: 10, border: '1px solid #ccc' }}>{message}</td>
//                 <td style={{ padding: 10, border: '1px solid #ccc' }}>{new Date(created_at).toLocaleString()}</td>
//                 <td style={{ padding: 10, border: '1px solid #ccc' }}>
//                   {reply ? (
//                     <div style={{ backgroundColor: '#d7f7d7', padding: 5, borderRadius: 5 }}>{reply}</div>
//                   ) : (
//                     <span style={{ color: '#999', fontStyle: 'italic' }}>No reply yet</span>
//                   )}
//                 </td>
//                 <td style={{ padding: 10, border: '1px solid #ccc', textAlign: 'center' }}>
//                   {!reply && (
//                     <FaReply
//                       title="Reply"
//                       onClick={() => openReplyModal(id)}
//                       style={{ cursor: 'pointer', marginRight: 10, color: '#366000' }}
//                     />
//                   )}
//                   <FaTrash
//                     title="Delete"
//                     onClick={() => deleteMessage(id)}
//                     style={{ cursor: 'pointer', color: '#b22222' }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {replyModal.open && (
//         <div style={{
//           position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//           backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
//           alignItems: 'center', justifyContent: 'center'
//         }}>
//           <div style={{ backgroundColor: 'white', padding: 30, borderRadius: 10, width: 500 }}>
//             <h3 style={{ marginBottom: 10 }}>Send a Reply</h3>
//             <textarea
//               rows={5}
//               value={replyText}
//               onChange={(e) => setReplyText(e.target.value)}
//               placeholder="Type your reply here..."
//               style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
//             />
//             <div style={{ marginTop: 15, display: 'flex', justifyContent: 'flex-end' }}>
//               <button
//                 onClick={submitReply}
//                 style={{ backgroundColor: '#366000', color: 'white', padding: '8px 16px', marginRight: 10, border: 'none', borderRadius: 4 }}
//               >
//                 Send
//               </button>
//               <button
//                 onClick={closeReplyModal}
//                 style={{ backgroundColor: '#ccc', padding: '8px 16px', border: 'none', borderRadius: 4 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactDashboard;
