import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

export const EditPost = ({ postId, setShowEditModal }) => {
  const [content, setContent] = useState("");
  const { jwt, getPosts } = useAppContext();

  useEffect(() => {
    getSinglePost();
  }, []);

  const getSinglePost = async () => {
    const { data } = await axios.get(
      `http://localhost:1337/api/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setContent(data.data.attributes.content);
  };

  const savePost = (e) => {
    const newContent = {
      content,
    };

    try {
      axios.put(
        `http://localhost:1337/api/posts/${postId}`,
        {
          data: { ...newContent },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setShowEditModal(false);
      getPosts();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" backdrop-blur flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-blend-darken">
      <div className="relative w-auto my-6 mx-auto max-w-3xl bg-blend-overlay">
        <div className="border-0 rounded-lg relative flex flex-col w-full  outline outline-white shadow-md shadow-primary bg-dark-200">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold">Edit</h3>
            <button
              className="bg-transparent border-0 text-white float-right"
              onClick={() => setShowEditModal(false)}
            >
              X
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <textarea
              className="bg-blend-darken textarea outline-1 focus:ring-offset-1 focus:ring-1 focus:ring-primary/75 outline outline-primary shadow-md shadow-primary bg-dark-200 text-base text-white font-body w-[30rem] h-16 ml-2 py-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="btn btn-xs hover:scale-110 hover:bg-orange-700 bg-primary text-white"
              type="button"
              onClick={() => savePost()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
