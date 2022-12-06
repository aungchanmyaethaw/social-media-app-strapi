import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import SinglePost from "../components/SinglePost";
const SinglePostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const tempId = parseInt(id);
  const { jwt, authedUser } = useAppContext();
  const [singlePost, setSinglePost] = useState({
    id: tempId,
    userId: 0,
    username: "",
    content: "",
  });

  useEffect(() => {
    if (jwt === "") {
      navigate("/");
    } else {
      getSinglePost();
      getComments();
    }
  }, [jwt]);

  const getSinglePost = async () => {
    const { data } = await axios.get(
      `http://localhost:1337/api/posts/${tempId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const tempObj = {
      id: data.data.id,
      userId: data.data.attributes.userId,
      username: data.data.attributes.username,
      content: data.data.attributes.content,
    };

    setSinglePost(tempObj);
  };

  const getComments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/comments?filters[post_id][$eq]=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const tempArr = data.data;
      console.log(tempArr);
    } catch (e) {
      console.log(e);
    }
  };

  //comment textarea
  //list of comments
  return (
    <div>
      <Navbar username={authedUser.username} />
      {tempId && <SinglePost {...singlePost} />}
      <form
        action="
      "
      >
        <textarea></textarea>
        <button className="bg-white">submit</button>
      </form>
    </div>
  );
};

export default SinglePostDetails;
