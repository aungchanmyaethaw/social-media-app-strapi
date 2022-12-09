import { useEffect, useState } from "react";

const Whats = ({ createPost, setContent, content }) => {
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (content === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [content]);

  return (
    <div className="w-full z-20 mb-10 sticky top-[56px] bg-dark-200">
      <form className="w-3/4 pr-12 pt-8" onSubmit={createPost}>
        <div className="flex justify-end">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full outline outline-2 outline-primary">
              <img src="public/thumpnail.png" alt="Profile" />
            </div>
            <textarea
              className="textarea outline-1 focus:ring-offset-1 focus:ring-1 focus:ring-primary/75 outline outline-primary shadow-md shadow-primary bg-dark-200 text-base text-white font-body w-[30rem] h-16 ml-2 py-2"
              placeholder="What's in your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        {/* Button */}
        <div className="flex justify-end mx-auto space-x-2 mt-2">
          <button
            className="btn btn-outline hover:outline hover:-outline-offset-1 hover:outline-1 hover:outline-primary hover:bg-dark-200 hover:text-primary btn-xs h-2"
            type="reset"
            onClick={() => setContent("")}
          >
            Clear
          </button>
          <button
            className="btn btn-xs hover:scale-110 hover:bg-orange-700 bg-primary text-white"
            type="submit"
            disabled={isEmpty}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Whats;
