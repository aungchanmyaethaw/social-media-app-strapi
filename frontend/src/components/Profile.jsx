import React from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = ({ username, nav=false , singlePost=false }) => {
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
    <div className="flex items-center gap-1 ml-2">
      {nav && <h2 className="font-body text-white text-xl pb-0.5">{username}</h2>}
      <div className="dropdown dropdown-left">
          <label tabIndex={0} className=" hover:scale-110 w-10 h-10 rounded-full">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full outline outline-2 outline-primary">
                <img src="../../public/thumpnail.png" alt="Profile" />
              </div>
            </div>
          </label>
          {nav && <div tabIndex={0} className="dropdown-content menu px-3 py-2 shadow bg-white rounded-box w-32 ">
            <button 
            className='btn btn-xs bg-primary text-white hover:bg-white hover:text-dark-200 mt-2 hover:scale-110 h-2'
            onClick={handleLogout}
            >
              Logout
            </button>
          </div>}
      </div>
      {singlePost ? <h2 className="font-body text-white text-xl pb-8">{username}</h2> : null}
    </div>
  );
};

export default Profile;
