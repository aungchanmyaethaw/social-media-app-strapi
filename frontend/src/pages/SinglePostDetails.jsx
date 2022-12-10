import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { handleDateFormat } from "../utils";
import SinglePost from "../components/SinglePost";
import { useAppContext } from "../context/AppContext";
import CommentInput from "../components/CommentInput";
import CommentContent from "../components/CommentContent";
import axios from "axios";
const SinglePostDetails = () => {
  const { jwt, authedUser, getComments, comments } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const tempId = parseInt(id);
  const [singlePost, setSinglePost] = useState({
    id: tempId,
    userId: 0,
    username: "",
    content: "",
    createdAt: "",
  });
  const [content, setContent] = useState("");

  useEffect(() => {
    if (jwt === "") {
      navigate("/");
    } else {
      getSinglePost();
      getComments(id);
    }
  }, [jwt]);

  const getSinglePost = async () => {
    const { data } = await axios.get(
      `http://localhost:1337/api/posts/${tempId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const tempObj = {
      id: data.data.id,
      userId: data.data.attributes.userId,
      username: data.data.attributes.username,
      content: data.data.attributes.content,
      createdAt: handleDateFormat(data.data.attributes.createdAt),
    };

    setSinglePost(tempObj);
  };

  const addComments = async (e) => {
    e.preventDefault();
    const tempData = {
      post_id: tempId,
      user_id: authedUser.id,
      content,
      username: authedUser.username,
    };

    try {
      await axios.post(
        "http://localhost:1337/api/comments",
        {
          data: tempData,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setContent("");
      getComments(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="min-h-screen pb-10">
      <Navbar username={authedUser.username} isCommentPage={true} />
      <div className="flex">
        <Sidebar />
        <div className="basis-3/4 ml-[3px]  min-h-screen border-l-[3px]">
          <div className="mt-[32px] bg-dark-200">
            <SinglePost {...singlePost} isCommentPage={true} />
            <CommentInput
              content={content}
              setContent={setContent}
              addComments={addComments}
            />
          </div>
          <section className="mt-4 ">
            {comments.length !== 0 ? (
              comments?.map((comment) => (
                <CommentContent key={comment.id} {...comment} />
              ))
            ) : (
              <p className="text-xl mx-auto font-head text-primary text-center">
                No Comment...
              </p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default SinglePostDetails;
