import React from "react";
import Profile from "./Profile";
import PostContent from "./PostContent";

const SinglePost = ({ id, userId, username, content }) => {
 

  return (
    <article className="w-full p-4 text-white mb-4">
      {/* <h3>{id}</h3>
      <h3>{userId}</h3>
      <h3>{username}</h3>
      <h2>{content}</h2>
      {hasLiked ? (
        <button onClick={deleteLike}>Remove Star</button>
      ) : (
        <button onClick={addLike}>AddStar</button>
      )}
      
      <p>{stars.length}</p> */}
      <section className="w-3/4 mx-auto mt-4">
            {/* Profile */}
        <Profile username={username} singlePost={true}/>
        
        {/* Post */}
        <PostContent id={id} userId={userId} username={username} content={content}/>
      </section>
    </article>
  );
};

export default SinglePost;
