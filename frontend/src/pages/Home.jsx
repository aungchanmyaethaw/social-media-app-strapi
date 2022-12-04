import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Button } from "react-bootstrap";
const Home = () => {
  const { jwt, authedUser, setJwt, setAuthedUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setJwt("");
    setAuthedUser({});
    localStorage.setItem("token", null);
    localStorage.setItem("userData", JSON.stringify(null));
    navigate("/");
  };

  return (
    <div>
      <h1>{authedUser.username}</h1>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
