import React from "react";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SinglePost = ({ id, userId, username, content }) => {
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

  // --- Likes ---

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

  // --- Comments----

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

  const hasLiked = stars.find((star) => star.userId === authedUser.id);

  return (
    <article className="p-4 text-white mb-4 bg-slate-600">
      <h3>{username}</h3>
      <h2>{content}</h2>
      <div className="flex gap-4">
        {/* like */}
        <div className="flex gap-2">
          {hasLiked ? (
            <button onClick={deleteLike}>Remove Star</button>
          ) : (
            <button onClick={addLike}>AddStar</button>
          )}
          <p>{stars.length}</p>
        </div>
        {/* comment */}
        <Link to={`/postdetails/${id}`}>
          <div className="flex gap-2">
            <p>comments</p>
            <span>{commentCount}</span>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default SinglePost;
