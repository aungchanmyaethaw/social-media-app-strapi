import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import SinglePost from "../components/SinglePost";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Home = () => {
  const { jwt, authedUser } = useAppContext();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === "") {
      navigate("/");
    } else {
      getPosts();
    }
  }, [jwt]);

  async function getPosts() {
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
  }

  async function createPost(event) {
    event.preventDefault();

    const tempData = {
      content,
      userId: authedUser.id,
      username: authedUser.username,
    };

    try {
      axios
        .post(
          "http://localhost:1337/api/posts",
          {
            data: tempData,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) =>
          setPosts([...posts, { ...tempData, id: res.data.data.id }])
        );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="w-full">
      <Navbar username={authedUser.username} />

      <hr />

      <div className="flex">
        <Sidebar />
        <div className="w-full">
          {/* <form onSubmit={createPost}>
            <textarea onChange={(e) => setContent(e.target.value)}></textarea>
            <div className="flex justify-end gap-4 text-white">
              <button type="submit">Submit</button>
              <button type="reset" onClick={() => setContent("")}>
                Discard
              </button>
            </div>
          </form> */}
          {posts.length != 0 &&
            posts.map((post) => <SinglePost {...post} key={post.id} />)}
        </div>
      </div>
    </main>
  );
};

export default Home;

// Navbar
//SinglePost
//Sidebar
