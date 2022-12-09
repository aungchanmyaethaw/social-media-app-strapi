import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const DotDropdown = ({ id, userId }) => {
  const { jwt, authedUser, getPosts, posts, setPosts } = useAppContext();

  const deleteOwnPost = async () => {
    try {
      axios.delete(`http://localhost:1337/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const posts = await getPosts();

      getPosts();
    } catch (e) {
      console.log(e);
    }
  };

  const hidePost = () => {
    const tempData = {
      post_id: id,
      user_id: authedUser.id,
    };

    try {
      axios.post(
        "http://localhost:1337/api/hideposts",
        {
          data: tempData,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      getPosts();
    } catch (e) {
      console.log(e);
    }
    const filteredPosts = posts.filter((post) => post.id != id);
    setPosts(filteredPosts);
  };

  return (
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
        {authedUser.id === userId && (
          <button className="btn btn-outline mb-2 hover:outline hover:-outline-offset-1 hover:outline-1 hover:outline-primary hover:bg-dark-200 hover:text-primary btn-xs h-2">
            Edit
          </button>
        )}
        <button
          className="btn btn-xs bg-primary text-white hover:bg-orange-700 hover:scale-110 h-2"
          onClick={userId === authedUser.id ? deleteOwnPost : hidePost}
        >
          {userId === authedUser.id ? "Delete" : "Hide"}
        </button>
      </div>
    </div>
  );
};

export default DotDropdown;
