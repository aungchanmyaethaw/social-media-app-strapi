import { useState, useEffect } from "react";

const CommentInput = ({
  content,
  setContent,
  addComments,
}) => {
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (content === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [content]);

  

  return (
    <div className="w-full flex-start">
      <form className="w-3/4 pr-12 pt-8">
        <div className="flex justify-end">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full outline outline-2 outline-primary">
              <img src="../../src/images/thumpnail.png" alt="Profile" />
            </div>
            <textarea
              className="textarea outline-1 focus:ring-offset-1 focus:ring-1 focus:ring-primary/75 outline outline-primary shadow-md shadow-primary bg-dark-200 text-base text-white font-body w-[30rem] h-16 ml-2 py-2"
              placeholder="Write a comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        {/* Button */}
     
          <div className="flex justify-end mx-auto space-x-2 mt-4">
            <button
              className="btn btn-outline hover:outline hover:-outline-offset-1 hover:outline-1 hover:outline-primary hover:bg-dark-200 hover:text-primary btn-xs h-2"
              type="reset"
              onClick={() => setContent("")}
            >
              Clear
            </button>
            <button
              className="btn btn-xs hover:scale-110 hover:bg-white hover:text-black bg-primary text-white"
              type="submit"
              onClick={addComments}
              disabled={isEmpty}
            >
              Comment
            </button>
          </div>
      </form>
    </div>
  );
};

export default CommentInput;
