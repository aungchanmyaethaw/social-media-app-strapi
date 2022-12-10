import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SinglePostDetails from "./pages/SinglePostDetails";
import SideBarPage from "./components/SideBarPage";
import NotFound from "./components/NotFound";

const App = () => {
  const location = useLocation();

  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />}>
          <Route path=":sideBarId" element={<SideBarPage />} />
          <Route path="" element={<Navigate to="newfeeds" />} />
        </Route>
        <Route path="/postdetails/:id" element={<SinglePostDetails />} />
        <Route path="/postdetails/:id/:sideBarId" element={<Navigate to={`/home/${location.pathname.split('/')[3]}` } />} />
      
      </Routes>
    </div>
  );
};

export default App;
