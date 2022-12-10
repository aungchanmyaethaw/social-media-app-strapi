import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { handleDateFormat } from "../utils";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const [jwt, setJwt] = useState("");
  const [authedUser, setAuthedUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  //  Auth

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (token != null && userData != null) {
      setJwt(token);
      setAuthedUser(userData);
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (jwt != "" && authedUser != {}) {
      localStorage.setItem("token", jwt);
      localStorage.setItem("userData", JSON.stringify(authedUser));
    }
  }, [jwt]);

  async function getPosts() {
    try {
      const { data: posts } = await axios.get(
        "http://localhost:1337/api/posts?sort=updatedAt:desc",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const { data: hideposts } = await axios.get(
        "http://localhost:1337/api/hideposts",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const tempArr = await posts.data.filter((post) => {
        return !hideposts.data.some((hiddenPost) => {
          return (
            hiddenPost.attributes.post_id === post.id &&
            hiddenPost.attributes.user_id === authedUser.id
          );
        });
      });

      setPosts(
        tempArr.map((post) => {
          return {
            id: post.id,
            userId: post.attributes.userId,
            username: post.attributes.username,
            content: post.attributes.content,
            createdAt: handleDateFormat(post.attributes.updatedAt),
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  const getComments = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/comments?filters[post_id][$eq]=${id}&sort=updatedAt:desc`,
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
            postId: comment.attributes.post_id,
            username: comment.attributes.username,
            content: comment.attributes.content,
            createdAt: handleDateFormat(comment.attributes.updatedAt),
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleJwt = (jwt) => {
    setJwt(jwt);
  };

  const handleAuthedUser = (user) => {
    setAuthedUser(user);
  };

  return (
    <AppContext.Provider
      value={{
        handleJwt,
        handleAuthedUser,
        jwt,
        authedUser,
        getPosts,
        posts,
        setPosts,
        getComments,
        comments,
        setComments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
