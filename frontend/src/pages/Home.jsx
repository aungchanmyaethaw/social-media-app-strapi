import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


const Home = () => {
  const { jwt, authedUser, getPosts } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === "") {
      navigate("/");
    } else {
      getPosts();
    }
  }, [jwt]);

  

  return (
    <main className="w-full min-h-screen">
      <Navbar username={authedUser.username} />

      {/* <hr className="head"/> */}

      <div className="flex w-full min-h-screen">
        <Sidebar />
        {/* New feeds */}
        <div className="basis-3/4 bg-dark-200 ml-[3px] border-l-[3px] border-white">
          <Outlet/>
        </div>
      </div>
    </main>
  );
};

export default Home;

// Navbar
//SinglePost
//Sidebar
