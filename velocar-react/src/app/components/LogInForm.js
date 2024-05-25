"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import "../public/assets/styles/LoginForm.css";

function LoginForm() {
  const router = useRouter();
  const [storedData, setStoredData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        setStoredData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let email = storedData.find((item) => item.email === formData.email);
    let password = storedData.find(
      (item) => item.password === formData.password
    );

    if (email && password) {
      alert("successfully login");
      router.push("/");
    } else {
      alert("there is no user");
    }

    console.log(formData);
  };

  return (
    <Container className="login-container">
      <Row>
        <Col md={{ size: 14, offset: 0 }}>
          <Form onSubmit={handleSubmit} className="login-form">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormGroup>

            <Button color="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
