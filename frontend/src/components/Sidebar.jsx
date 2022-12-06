import React from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { handleJwt, handleAuthedUser } = useAppContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    handleJwt("");
    handleAuthedUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <aside className="basis-1/4 ml-2 bg-dark-primary flex justify-between flex-col px-8">
      <div>{/* Sidebar Menu */}</div>
      <div>
        <button onClick={handleLogout} className="text-white">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
