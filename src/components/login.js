import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Login = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setMessage('Please fill in all fields.');
      return;
    }
    setMessage(`Welcome, ${form.name}!`);
    // You can add actual login logic here (e.g., API call)
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <Card className="shadow border-0">
          <Card.Body>
            <h3 className="text-center mb-4 text-success fw-bold">Login</h3>
            {message && <div className="alert alert-info text-center">{message}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                className="w-100"
                style={{ backgroundColor: '#366000' }}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Login;
