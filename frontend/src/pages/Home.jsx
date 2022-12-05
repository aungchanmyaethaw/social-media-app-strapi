import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Button } from "react-bootstrap";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";

const Home = () => {
  const { jwt, authedUser, setJwt, setAuthedUser } = useAppContext();
  console.log(authedUser);
  const [posts, setPosts] = useState([]);
  const [stars, setStars] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setJwt("");
    setAuthedUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  useEffect(() => {
    if (jwt === "") {
      navigate("/");
    } else {
      getPosts();
      getStars();
    }
  }, [jwt]);

  async function getPosts() {
    try {
      const { data } = await axios.get(`http://localhost:1337/api/posts`);
      console.log(data);
      setPosts(
        data.data.map((post) => {
          return {
            id: post.id,
            userId: post.attributes.user_id,
            username: post.attributes.username,
            content: post.attributes.content,
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  const createPost = async (event) => {
    event.preventDefault();
    console.log("auth", authedUser);
    const tempData = {
      content,
      user_id: JSON.stringify(authedUser.id),
      username: authedUser.username,
    };

    try {
      const res = await axios.post(
        "http://localhost:1337/api/posts",
        {
          data: tempData,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(res);
      setPosts([...posts, tempData]);
    } catch (e) {
      console.log(e);
    }
  };

  const addStars = async (id, userId) => {
    const tempData = {
      star: 1,
      post_id: id,
      user_id: userId,
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
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const getStars = async () => {
    try {
      const { data } = await axios.get("http://localhost:1337/api/stars");
      console.log("stars:", data.meta.pagination.total);
      setStars(data.meta.pagination.total);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={createPost}>
        <textarea onChange={(e) => setContent(e.target.value)}></textarea>
        <button type="submit">Submit</button>
      </form>

      <h1>{authedUser.username}</h1>
      {posts.length != 0 &&
        posts?.map(({ id, userId, username, content }) => (
          <div className="p-4 bg-secondary mb-4">
            <h3>postId: {id}</h3>
            <h3>userID: {userId}</h3>
            <h3>{username}</h3>
            <h2>{content}</h2>
            <button onClick={() => addStars(id, userId)}>Star: {stars}</button>
          </div>
        ))}
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
