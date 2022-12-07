import React from "react";

const CommentContent = ({ username, content, createdAt, postId, userId }) => {
  return (
    <article className=" bg-[#444] ">
      <p>{username}</p>
      <p>{content}</p>
      <p>{createdAt}</p>
      <p>{postId}</p>
      <p>{userId}</p>
    </article>
  );
};

export default CommentContent;
