import React from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import SideBarList from "./SideBarList";
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
    <aside className="basis-1/4 sticky top-16 h-fit  flex space-y-8 justify-between items-center flex-col py-10 px-8">
      <SideBarList />

      <div className="w-3/4 flex justify-start">
        <button
          onClick={handleLogout}
          className="w-full rounded-full bg-primary hover:bg-white hover:scale-110 hover:text-dark-200 py-1 text-white font-head text-lg"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
