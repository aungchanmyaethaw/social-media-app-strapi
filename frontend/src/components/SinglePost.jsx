import React from "react";
import Profile from "./Profile";
import PostContent from "./PostContent";

const SinglePost = ({
  id,
  userId,
  username,
  content,
  createdAt,
  isCommentPage = false,
}) => {
  return (
    <article className="w-full p-4 text-white mb-4">
      <section className="w-3/4 mx-auto">
        {/* Profile */}
        <Profile username={username} singlePost={true} />

        {/* Post */}
        <PostContent
          id={id}
          userId={userId}
          username={username}
          content={content}
          createdAt={createdAt}
          isCommentPage={isCommentPage}
        />
      </section>
    </article>
  );
};

export default SinglePost;
