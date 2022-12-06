import React from 'react'
import {BsThreeDots} from 'react-icons/bs'


const DotDropdown = () => {
  return (
    <div className="dropdown dropdown-left w-2 h-2 -mt-1">
      <label tabIndex={0} >
        <button>
          <BsThreeDots />
        </button>
      </label>
      <div tabIndex={0} className="dropdown-content menu py-2 px-4 shadow bg-gray-200 rounded-box w-24 ">
        <button className="btn btn-outline btn-xs h-2">Edit</button>
        <button className='btn btn-error btn-xs mt-2 hover:scale-110 h-2'>Delete</button>
      </div>
    </div>
  )
}

export default DotDropdown