import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import {AiOutlineStar} from 'react-icons/ai';
import {AiFillStar} from 'react-icons/ai';
import {BiComment} from 'react-icons/bi';
import DotDropdown from './DotDropdown';

const PostContent = ({ id, userId, username, content }) => {
  const { jwt, authedUser } = useAppContext();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    getLikes();
  }, []);

  //deletelikes
  //setlikes

  const getLikes = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/stars?filters[post_id][$eq]=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const filteredArr = data.data.map((star) => {
        return { userId : star.attributes.user_id };
      });
      console.log(filteredArr);
      setStars(filteredArr);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteLike = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/stars?filters[post_id][$eq]=${id}&filters[user_id][$eq]=${authedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const wantToDeleteStarId = data.data[0].id;
      await axios.delete(
        `http://localhost:1337/api/stars/${wantToDeleteStarId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      getLikes();
    } catch (e) {
      console.log(e);
    }
  };

  const addLike = async () => {
    const tempData = {
      post_id: id,
      user_id: authedUser.id,
    };

    try {
      const res = await axios.post(
        "http://localhost:1337/api/stars",
        {
          data: tempData,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      getLikes();
    } catch (e) {
      console.log(e);
    }
  };

  const hasLiked = stars.find((star) => star.userId === authedUser.id);

  return (
    <div className="w-11/12 pl-6 pr-6 py-2 mx-auto bg-dark-100 rounded-lg -mt-8">
          <div className="flex justify-between"> 
            <p className="text-xs -mt-1">12.11.2022</p>
            <DotDropdown />
          </div>

          <h2 className="mx-6 mt-2 text-left">
            {content}
          </h2>
          
          {/* Star Button */}
          <div className="flex font-body text-sm number-sm  w-full justify-between mt-1 px-10">
            <div className="flex items-center">
              {hasLiked ? <AiFillStar /> : null}
              <p className='mt-1 ml-1'></p>
            </div>
            
            <p>10 comments</p>
          </div>

          <hr className="w-11/12 mx-auto" />

          <div className="flex h-2 w-11/12 justify-around mx-auto mt-2" >
            <div className="flex w-1/2 items-center"> 
              { hasLiked ? 
              (<button 
              className="mx-auto hover:scale-110 active:scale-100"
              onClick={deleteLike}>
                <div className="flex items-center">
                  <AiFillStar color='#EE6640'/>
                  <p className="text-sm font-body ml-2 text-primary">Star</p>
                </div>            
              </button>) : 
              (<button 
              className="mx-auto hover:scale-110 active:scale-100"
              onClick={addLike}>
                <div className="flex items-center">
                  <AiOutlineStar />
                  <p className="text-sm font-body ml-2">Star</p>
                </div>
                 
              </button>)
              }
            </div>
            <div className="w-1/2 flex items-center">
              <button className="mx-auto hover:scale-110 flex items-center active:text-primary active:scale-100">
                  <BiComment className='active:item-primary'/>
                  <p className="text-sm font-body mb-1 ml-2">Comment</p>                     
              </button>
            </div>
          </div>
        </div>
  )
}

export default PostContent