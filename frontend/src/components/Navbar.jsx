import React from "react";
import Search from "./Search";
import Profile from "./Profile";
const Navbar = ({ username }) => {
  return (
    <nav className="bg-gray-400  px-8 py-8 flex justify-between item-center">
      {/* Logo */}
      <img src="" alt="logo" />
      {/* Search */}
      <Search />
      {/* Profile */}
      <Profile username={username} />
    </nav>
  );
};

export default Navbar;
