import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='h-screen flex-col w-screen gap-10 text-primary font-head flex items-center justify-center text-3xl'>
        Something Went Wrong !!
        <Link className='underline text-base text-white font-body' to = '/'>
            Back to Login Page..
        </Link>
    </div>
  )
}

export default NotFound