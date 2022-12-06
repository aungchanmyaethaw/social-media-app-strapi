import React from "react";

const Search = () => {
  return (
    <form className="flex items-center justify-center w-1/4 gap-1">
            <input type="text" placeholder="Search User" className="input input-sm scale-95 focus:scale-100 bg-white input-bordered text-base-200 font-body w-full max-w-xs" ></input>
            <button type="submit" className="btn bg-white text-base-200 border-none hover:bg-dark-100 hover:scale-110 hover:text-white btn-xs text-xs">Search</button>
          </form>
  );
};

export default Search;
