import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { useAppContext } from '../context/AppContext';
import SinglePost from './SinglePost';
import Whats from './Whats';
import { handleDateFormat } from "../utils";


const SideBarPage = () => {
    const { sideBarId } = useParams();
    const { posts, setPosts, jwt, authedUser } = useAppContext();
    const [content, setContent] = useState('');

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

  if(sideBarId === 'newfeeds') {
    return (
    <>
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
          )}</>
  )
  }
  else {
    return (
        <div className="w-full flex h-64 items-center justify-center">
             <h1 className="text-center text-3xl font-head text-primary capitalize">
                {sideBarId} Page
             </h1>
        </div>
    )
  }

  
}

export default SideBarPage