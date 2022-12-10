import React from "react";

const Profile = ({ username, nav = false, singlePost = false }) => {
  return (
    <div className="flex items-center gap-2 ml-2">
      {nav && (
        <h2 className="font-body text-white text-xl capitalize">
          {username}
        </h2>
      )}
      <div className="avatar">
        <div className="w-10 h-10 rounded-full outline outline-2 outline-primary">
          <img src="../../src/images/thumpnail.png" alt="Profile" />
        </div>
      </div>
      {singlePost ? (
        <h2 className="font-body text-white text-xl pb-8 capitalize">
          {username}
        </h2>
      ) : null}
    </div>
  );
};

export default Profile;
