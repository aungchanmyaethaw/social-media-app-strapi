import React from "react";

const Search = () => {
  return (
    <form className="flex items-center justify-center w-1/4">
            <input type="text" placeholder="Search User" className="input input-sm bg-white input-bordered shadow shadow-base-200/30 text-base-200 font-body w-full max-w-xs mr-1" ></input>
            <button type="submit" className="btn bg-white text-base-200 border-none hover:bg-dark-100 hover:text-white btn-xs text-xs">Search</button>
          </form>
  );
};

export default Search;
