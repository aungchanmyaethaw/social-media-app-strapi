import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SinglePostDetails from "./pages/SinglePostDetails";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/postdetails/:id" element={<SinglePostDetails />} />
      </Routes>
    </div>
  );
};

export default App;
