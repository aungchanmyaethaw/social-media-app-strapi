import React from "react";
import Search from "./Search";
import Profile from "./Profile";
const Navbar = ({ username }) => {
  return (
    <nav className="bg-primary  px-8 py-8 flex justify-between items-center">
      <div className="flex items-end">
        <img className="w-12 h-12" src="../../public/icon-facebook.svg" alt="logo" />
        {/* <h2 className="text-3xl text-white font-body inline text-bold ml-2">Facebook</h2> */}
      </div>
      {/* Search */}
      <Search />
      {/* Profile */}
      <Profile username={username} nav={true} />
    </nav>
  );
};

export default Navbar;
