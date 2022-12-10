import React from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const NotFound = () => {
    const { sideBarId } = useSearchParams();
    console.log(sideBarId);

  return (
    <div className='h-screen flex-col w-screen gap-10 text-primary font-head flex items-center justify-center text-3xl'>
        Something Went Wrong !!
        {/* {authedUser ? 
        <Link className='underline text-base text-white font-body' to = '/home'>
            Back to Home Page..
        </Link>
        : */}
        <Link className='underline text-base text-white font-body' to = '/'>
            Back to Login Page..
        </Link>
        {/* } */}
    </div>
  )
}

export default NotFound