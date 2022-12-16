import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

import { Link, useNavigate } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import DotDropdown from "./DotDropdown";

const PostContent = ({
  id,
  userId,
  username,
  content,
  createdAt,
  isCommentPage = false,
}) => {
  const navigate = useNavigate();
  const { jwt, authedUser } = useAppContext();
  const [stars, setStars] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    if (jwt === "") {
      navigate("/");
    } else {
      getLikes();
      getCommentCount();
    }
  }, [jwt]);

  // Likes aka Stars

  const getLikes = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/stars?filters[post_id][$eq]=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const filteredArr = data.data.map((star) => {
        return { userId: star.attributes.user_id };
      });

      setStars(filteredArr);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteLike = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/stars?filters[post_id][$eq]=${id}&filters[user_id][$eq]=${authedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const wantToDeleteStarId = data.data[0].id;
      await axios.delete(
        `http://localhost:1337/api/stars/${wantToDeleteStarId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      getLikes();
    } catch (e) {
      console.log(e);
    }
  };

  const addLike = async () => {
    const tempData = {
      post_id: id,
      user_id: authedUser.id,
    };

    try {
      const res = await axios.post(
        "http://localhost:1337/api/stars",
        {
          data: tempData,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      getLikes();
    } catch (e) {
      console.log(e);
    }
  };

  //count of comments

  const getCommentCount = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/comments?filters[post_id][$eq]=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const tempCount = data.data.length;
      setCommentCount(tempCount);
    } catch (e) {
      console.log(e);
    }
  };

  if (isCommentPage && jwt !== "") {
    getCommentCount();
  }

  const hasLiked = stars.find((star) => star.userId === authedUser.id);

  const comment = (commentCount) => {
    if (commentCount === 0) {
      return null;
    } else if (commentCount === 1) {
      return `${commentCount} comment`;
    } else {
      return `${commentCount} comments`;
    }
  };

  return (
    <div className="w-11/12 pl-6 pr-6 mx-auto bg-dark-200 outline outline-1 outline-primary shadow-md shadow-primary rounded-lg -mt-8">
      <div className="flex justify-between pt-2">
        <p className="text-[12px] ml-1 text-gray-400 font-body">{createdAt}</p>
        {!isCommentPage && <DotDropdown userId={userId} id={id} />}
      </div>

      <p className="mx-6 mt-2 text-left font-body text-indent-4 text-white pb-2">
        {content}
      </p>

      <div className="flex font-body text-sm text-gray-400 w-full justify-between px-10">
        <div className="flex items-center">
          {stars.length !== 0 ? (
            <>
              <AiFillStar color="#ee6640" />
              <p className="ml-1 mt-1"> {stars.length} </p>
            </>
          ) : null}
        </div>

        {commentCount !== 0 ? <span>{comment(commentCount)}</span> : null}
      </div>

      <div className="flex h-2 w-11/12 justify-around mx-auto  border-t border-primary py-4">
        <div className="flex w-1/2 items-center">
          {hasLiked ? (
            <button
              className="mx-auto hover:scale-110 active:scale-100"
              onClick={deleteLike}
            >
              <div className="flex items-center">
                <AiFillStar color="#EE6640" />
                <p className="text-sm font-body ml-2 text-primary">Star</p>
              </div>
            </button>
          ) : (
            <button
              className="mx-auto hover:scale-110 active:scale-100"
              onClick={addLike}
            >
              <div className="flex items-center">
                <AiOutlineStar />
                <p className="text-sm font-body ml-2">Star</p>
              </div>
            </button>
          )}
        </div>
        <div className="w-1/2 flex items-center">
          {isCommentPage ? (
            <Link
              className="mx-auto hover:scale-110 flex items-center active:text-primary active:scale-100"
              to="/home"
            >
              <FiHome />
              <p className="text-sm font-body ml-2">Back to Home</p>
            </Link>
          ) : (
            <Link
              className="mx-auto hover:scale-110 flex items-center active:text-primary active:scale-100"
              to={`/postdetails/${id}`}
            >
              <BiComment />
              <p className="text-sm font-body ml-2">Comment</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
