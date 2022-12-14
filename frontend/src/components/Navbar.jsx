import React from "react";
import Search from "./Search";
import Profile from "./Profile";
import { FaCommentAlt } from "react-icons/fa"

const Navbar = ({ username , isCommentPage=false}) => {
  return (
    <nav className="bg-primary z-10 sticky top-0 px-10 py-2 flex justify-between items-center drop-shadow-lg">
      <div className="flex items-end">
        <img className="w-10 h-10 rounded-lg" src="../src/images/2.png" alt="logo" />
        {/* <h2 className="text-xl text-white font-body text-bold ml-2">Facebook</h2> */}
      </div>
      {/* Search */}
      {!isCommentPage ? <Search /> : <FaCommentAlt className="w-8 h-8 text-white"/>}
      {/* Profile */}
      <Profile username={username} nav={true} />
    </nav>
  );
};

export default Navbar;
