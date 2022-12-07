import React from "react";

const CommentContent = ({ username, content }) => {
  return (
    <article className=" bg-[#444] ">
      <p>{username}</p>
      <p>{content}</p>
    </article>
  );
};

export default CommentContent;
