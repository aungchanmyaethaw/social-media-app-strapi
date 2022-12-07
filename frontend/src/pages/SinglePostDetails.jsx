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
  const { jwt, authedUser } = useAppContext();
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
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (jwt === "") {
      navigate("/");
    } else {
      getSinglePost();
      getComments();
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

  const getComments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/comments?filters[post_id][$eq]=${id}&sort=createdAt:desc`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setComments(
        data.data.map((comment) => {
          return {
            id: comment.id,
            userId: comment.attributes.user_id,
            username: comment.attributes.username,
            content: comment.attributes.content,
            createdAt: handleDateFormat(comment.attributes.createdAt),
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
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
      await axios
        .post(
          "http://localhost:1337/api/comments",
          {
            data: tempData,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          setComments(
            [
              {
                ...tempData,
                id: res.data.data.id,
                createdAt: handleDateFormat(res.data.data.attributes.createdAt),
              },
            ].concat([...comments])
          );
          setContent("");
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="min-h-screen border ">
      <Navbar username={authedUser.username} />
      <div className="flex">
        <Sidebar />
        <div className="basis-3/4 ml-[3px] border-l-[3px] border-white min-h-screen ">
          <div className="mt-[32px] bg-dark-200">
            <SinglePost {...singlePost} isCommentPage={true} />
            <CommentInput
              content={content}
              setContent={setContent}
              addComments={addComments}
            />
          </div>
          <section className="mt-20 pl-20 ">
            {comments.length !== 0 ? (
              comments?.map((comment) => (
                <CommentContent key={comment.id} {...comment} />
              ))
            ) : (
              <p className="text-xl font-head text-primary">No Comment...</p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default SinglePostDetails;
