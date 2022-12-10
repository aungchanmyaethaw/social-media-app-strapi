import React from "react";
import Profile from "./Profile";
import CommentDotDropdown from "./CommentDotDropdown";
const CommentContent = ({
  id,
  username,
  content,
  createdAt,
  postId,
  userId,
  setComments,
  getWantToEditComment,
  getComments
}) => {
  return (
    <div className="w-2/3 mx-auto mt-6 ">
      <Profile username={username} singlePost={true} />
      <div className="w-11/12 mx-auto pl-8 pr-6 bg-dark-200 outline outline-1 outline-primary shadow-md shadow-primary rounded-lg -mt-8">
        <div className="flex justify-between pt-2">
          <p className="text-[12px] -mt-1 -ml-2 text-gray-400 font-body ">
            {createdAt}
          </p>
          <CommentDotDropdown
            commentId={id}
            postId={postId}
            userId={userId}
            setComments={setComments}
            getWantToEditComment={getWantToEditComment}
            content={content}
            getComments={getComments}
          />
        </div>

        <p className="mx-6 mt-2 text-left font-body text-indent-4 text-white py-4">
          {content}
        </p>
      </div>
    </div>
  );
};

export default CommentContent;
