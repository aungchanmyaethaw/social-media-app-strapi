import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const { setJwt, setAuthedUser } = useAppContext();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isdisabledButton, setIsdisabledButton] = useState(false);
  const handleChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsdisabledButton(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:1337/api/auth/local/register",
        {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        }
      );
      setJwt(res.data.jwt);
      setAuthedUser(res.data.user);
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
    setIsdisabledButton(false);
  };

  return (
    <div>
      <h1 className="mb-3">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            required
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isdisabledButton}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
