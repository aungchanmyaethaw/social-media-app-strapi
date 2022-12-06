import React from "react";

const Profile = ({ username }) => {
  return (
    <div className="flex items-center gap-2">
      <img src="" alt="profile" />
      <h2>{username}</h2>
    </div>
  );
};

export default Profile;
