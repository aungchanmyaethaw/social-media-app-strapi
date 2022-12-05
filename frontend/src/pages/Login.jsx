import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
const Login = () => {
  const navigate = useNavigate();
  const { setJwt, setAuthedUser } = useAppContext();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isdisabledButton, setIsdisabledButton] = useState(false);
  const handleChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsdisabledButton(true);
    try {
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: userData.email,
        password: userData.password,
      });
      console.log(res);
      setJwt(res.data.jwt);
      setAuthedUser(res.data.user);
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
    setIsdisabledButton(false);
  };

  return (
    <div className="p-4">
      <h1 className="mb-3">Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isdisabledButton}>
          Login
        </Button>
        <Link to="/register" className="ms-4">
          Register
        </Link>
      </Form>
    </div>
  );
};

export default Login;
