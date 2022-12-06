import React from "react";

const Profile = ({ username, nav=false , singlePost=false }) => {
  return (
    <div className="flex items-center gap-1">
      {nav && <h2 className="font-body text-lg pb-0.5">{username}</h2>}
      <div className="dropdown dropdown-left">
          <label tabIndex={0} className=" hover:scale-110 w-12 h-10 rounded-full">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img src="../../public/thumpnail.png" alt="Profile" />
              </div>
            </div>
          </label>
          {nav && <div tabIndex={0} className="dropdown-content menu py-2 px-4 shadow bg-white rounded-box w-32 ">
            <button className="btn btn-outline btn-xs">Profile</button>
            <button className='btn btn-error btn-xs mt-2 hover:scale-110'>Logout</button>
          </div>}
      </div>
      {singlePost ? <h2 className="font-body text-lg pb-6">{username}</h2> : null}
    </div>
  );
};

export default Profile;
