import React from "react";
import Search from "./Search";
import Profile from "./Profile";
const Navbar = ({ username }) => {
  return (
    <nav className="bg-primary z-10 sticky top-0 px-10 py-2 flex justify-between items-center drop-shadow-lg">
      <div className="flex items-end">
        <img className="w-8 h-8" src="../../public/icon-facebook.svg" alt="logo" />
        {/* <h2 className="text-xl text-white font-body text-bold ml-2">Facebook</h2> */}
      </div>
      {/* Search */}
      <Search />
      {/* Profile */}
      <Profile username={username} nav={true} />
    </nav>
  );
};

export default Navbar;
