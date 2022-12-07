import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import SinglePost from "../components/SinglePost";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Whats from "../components/Whats";
import { handleDateFormat } from "../utils";
const Home = () => {
  const { jwt, authedUser, getPosts, posts, setPosts } = useAppContext();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === "") {
      navigate("/");
    } else {
      getPosts();
    }
  }, [jwt]);

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
        .then((res) => {
          setPosts(
            [
              {
                ...tempData,
                id: res.data.data.id,
                createdAt: handleDateFormat(res.data.data.attributes.createdAt),
              },
            ].concat([...posts])
          );
          setContent("");
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="w-full min-h-screen">
      <Navbar username={authedUser.username} />

      {/* <hr className="head"/> */}

      <div className="flex w-full min-h-screen">
        <Sidebar />
        {/* New feeds */}
        <div className="basis-3/4 bg-dark-200 ml-[3px] border-l-[3px] border-white">
          <Whats
            createPost={createPost}
            setContent={setContent}
            content={content}
            placeholder="What's in your mind?"
          />
          {posts.length !== 0 ? (
            posts.map((post) => <SinglePost {...post} key={post.id} />)
          ) : (
            <p className="text-4xl text-primary mt-[10rem]  font-head text-center">
              Currently Empty...
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

// Navbar
//SinglePost
//Sidebar
