import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { RxCross2 } from 'react-icons/rx'
import { useParams } from "react-router-dom";

// id CmtId or PostId
export const EditModal = ({ 
  id,
  setShowEditModal,
  isCommentPage = false
}) => {
  const [content, setContent] = useState("");
  const { jwt, getPosts, getComments } = useAppContext();
  const postId = useParams();

  useEffect(() => {
    isCommentPage ? getSingleComment() : getSinglePost() ;
  }, []);

  const getSinglePost = async () => {
    const { data } = await axios.get(
      `http://localhost:1337/api/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setContent(data.data.attributes.content);
  };

  const getSingleComment = async () => {
    const { data } = await axios.get(
      `http://localhost:1337/api/comments/${id}`,
      {
        headers : {
          Authorization : `Bearer ${jwt}`,
        }
      }
    );
    setContent(data.data.attributes.content);  }

    const saveComment = (e) => {
    e.preventDefault();
    const newContent = {
      content,
    };

    try {
      axios.put(
        `http://localhost:1337/api/comments/${id}`,
        {
          data : {...newContent}
        },
        {
          headers : {
            Authorization : `Bearer ${jwt}`
          }
        }
      );
      setShowEditModal(false);
      getComments(postId.id);
      setContent("");
    }
    catch (e) {
      console.log(e);
    }    
  }

  const savePost = (e) => {
    e.preventDefault();
    const newContent = {
      content,
    };

    try {
      axios.put(
        `http://localhost:1337/api/posts/${id}`,
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
      setContent('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" backdrop-blur flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-blend-darken">
      <div className="relative w-auto my-6 mx-auto max-w-3xl bg-blend-overlay">
        <div className="border-0 rounded-lg relative flex flex-col w-full  outline outline-white shadow-md shadow-primary bg-dark-200">
          <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font-semibold font-head">Edit</h3>
            <button
              className="bg-transparent border-0 text-white float-right hover:text-primary"
              onClick={() => setShowEditModal(false)}
            >
              <RxCross2 className="w-6 h-6"/>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <textarea
              className="textarea outline-1 focus:ring-offset-1 focus:ring-1 focus:ring-primary/75 outline outline-primary shadow-md shadow-primary bg-dark-200 text-base text-white font-body w-[30rem] h-16 ml-2 py-2"
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="btn btn-xs hover:scale-110 hover:bg-orange-700 bg-primary text-white"
              type="button"
              onClick= {!isCommentPage ? savePost : saveComment}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
