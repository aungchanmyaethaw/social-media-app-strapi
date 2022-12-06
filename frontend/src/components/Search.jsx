import React from "react";

const Search = () => {
  return (
    <form className="flex items-center justify-center w-1/2">
            <input type="text" placeholder="Type here" className="input input-md bg-white input-bordered w-full max-w-xs mr-2" ></input>
            <button className="btn btn-sm border-white text-white btn-outline">Search</button>
          </form>
  );
};

export default Search;
