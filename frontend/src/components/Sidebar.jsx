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
    <aside className="basis-1/4 sticky top-16 h-fit bg-dark-200 flex space-y-8 justify-between items-center flex-col py-10 px-8">
      {/* <div className="flex w-full shadow-md py-4 rounded-full shadow-primary text-primary justify-center text-base font-head gap-10">
        <h2>Icons</h2>
        <h2>NewFeeds</h2>
      </div>
      <div className="flex w-full shadow py-4 rounded-full shadow-white text-white justify-center text-base font-head gap-10">
        <h2>Icons</h2>
        <h2>Messenger</h2>
      </div> */}
      
      <SideBarList />
      
      <div className="w-3/4 flex justify-start">
        <button onClick={handleLogout} className="w-full rounded-full bg-primary hover:bg-white hover:scale-110 hover:text-dark-200 py-1 text-white font-head text-lg">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
