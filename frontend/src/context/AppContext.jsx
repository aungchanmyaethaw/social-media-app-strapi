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
  const [hidePostsData, setHidePostsData] = useState([]);

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
      const { data } = await axios.get(
        "http://localhost:1337/api/posts?sort=createdAt:desc",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setPosts(
        data.data.map((post) => {
          return {
            id: post.id,
            userId: post.attributes.userId,
            username: post.attributes.username,
            content: post.attributes.content,
            createdAt: handleDateFormat(post.attributes.createdAt),
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function getHidePostsData() {
    try {
    const { data } = await axios.get(
        "http://localhost:1337/api/hides",
        {
          headers : {
            Authorization : `Bearer ${jwt}`,
          }
        }
    ) 
    setHidePostsData(
      data.data.map((item) => {
        return {
          hidePostId : item.attributes.postId,
          hideUserId : item.attributes.userId,
        }         
      })
    )  
    }
    catch (e) {
        console.log(e);
    }
  }

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
        getHidePostsData,
        hidePostsData,
        setHidePostsData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
