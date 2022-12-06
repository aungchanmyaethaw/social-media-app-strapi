import React from 'react'
import {BsThreeDots} from 'react-icons/bs'


const DotDropdown = () => {
  return (
    <div className="dropdown dropdown-left w-2 h-2 -mt-1">
      <label tabIndex={0} >
        <button>
          <BsThreeDots color='#ee6640'/>
        </button>
      </label>
      <div tabIndex={0} className="dropdown-content menu py-2 px-3 shadow bg-dark-200 outline outline-1 outline-white rounded-box ">
        <button className="btn btn-outline hover:outline hover:-outline-offset-1 hover:outline-1 hover:outline-primary hover:bg-dark-200 hover:text-primary btn-xs h-2">Edit</button>
        <button className='btn btn-xs bg-primary text-white hover:bg-white hover:text-dark-200 mt-2 hover:scale-110 h-2'>Delete</button>
      </div>
    </div>
  )
}

export default DotDropdown