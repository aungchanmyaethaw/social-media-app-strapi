import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SinglePostDetails from "./pages/SinglePostDetails";
import SideBarPage from "./components/SideBarPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />}>
          <Route path=":id" element={<SideBarPage />} />
          <Route path="" element={<Navigate to="newfeeds" />} />
        </Route>
        <Route path="/postdetails/:id" element={<SinglePostDetails />} />
      </Routes>
    </div>
  );
};

export default App;
