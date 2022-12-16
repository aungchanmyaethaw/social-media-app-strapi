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
    <aside className="basis-1/4 sticky top-16 h-fit  flex space-y-4 justify-between items-center flex-col py-6 px-8">
      <SideBarList />

      <div className="w-3/4 flex justify-start">
        <button
          onClick={handleLogout}
          className="text-white w-[15rem] bg-primary py-2 font-semibold text-lg rounded-3xl transition-colors duration-200 hover:bg-orange-700 font-head"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
