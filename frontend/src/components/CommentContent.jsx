import React from "react";
import Profile from "./Profile";
import { AiFillStar } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const CommentContent = ({ username, content, createdAt, postId, userId }) => {
  return (
    // <article className=" bg-[#444] ">
    //   <p>{username}</p>
    //   <p>{content}</p>
    //   <p>{createdAt}</p>
    //   <p>{postId}</p>
    //   <p>{userId}</p>
    // </article>
    <div className="w-2/3 mx-auto mt-6">
      <Profile username={username} singlePost={true} />
      <div className="w-11/12 mx-auto pl-8 pr-6 bg-dark-200 outline outline-1 outline-primary shadow-md shadow-primary rounded-lg -mt-8">
        <div className="flex justify-between pt-2">
          <p className="text-[12px] -mt-1 -ml-2 text-gray-400 font-body ">{createdAt}</p>
          <div className="dropdown dropdown-left w-2 h-2 -mt-1">
            <label tabIndex={0}>
              <button>
                <BsThreeDots color="#ee6640" />
              </button>
            </label>
            <div
              tabIndex={0}
              className="dropdown-content menu py-2 px-3 shadow bg-dark-200 outline outline-1 outline-white rounded-box "
            >             
              <button
                className="btn btn-xs bg-primary text-white hover:bg-orange-700 hover:scale-110 h-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <p className="mx-6 mt-2 text-left font-body text-indent-4 text-white pb-2">
          {content}
        </p>  

        <div className="flex h-2 w-11/12 justify-center  border-t border-primary py-4">
          <div className="flex w-1/2 items-center">
            {/* {hasLiked ? ( */}
              <button
                className="mx-auto hover:scale-110 active:scale-100"
              >
                <div className="flex items-center">
                  <AiFillStar color="#EE6640" />
                  <p className="text-sm font-body ml-2 text-primary">Star</p>
                </div>
              </button>
            {/* ) : (
              <button
                className="mx-auto hover:scale-110 active:scale-100"
              >
                <div className="flex items-center">
                  <AiOutlineStar />
                  <p className="text-sm font-body ml-2">Star</p>
                </div>
              </button>
            )} */}
          </div> 
        </div>     
      </div>
    </div>
  );
};

export default CommentContent;
