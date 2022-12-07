import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const [jwt, setJwt] = useState("");
  const [authedUser, setAuthedUser] = useState({});

  const [posts, setPosts] = useState("");

  const getPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:1337/api/posts", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      setPosts(
        data.data.map((post) => {
          return {
            id: post.id,
            userId: post.attributes.userId,
            username: post.attributes.username,
            content: post.attributes.content,
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
