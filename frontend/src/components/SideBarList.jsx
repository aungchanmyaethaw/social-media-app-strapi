import React from 'react'
import { FaHome } from 'react-icons/fa'
import { RiMessengerLine } from 'react-icons/ri'
import { ImFilm } from 'react-icons/im'
import { RiPagesLine } from 'react-icons/ri'
import { CgGames } from 'react-icons/cg'
import { FaWpexplorer } from 'react-icons/fa'
import { MdOutlineGroup } from 'react-icons/md'
import { BsCalendar2Event } from 'react-icons/bs'
import { BsCollection } from 'react-icons/bs'


const SideBarList = () => {
  return (
    <>
      <div className="flex text-primary flex-start w-3/4 text-lg font-head gap-8">
        <FaHome className="w-6 h-6" />
        <h2>NewFeeds</h2>
      </div>
      <div className="flex text-white flex-start w-3/4 text-lg font-head gap-8">
        <RiMessengerLine className="w-6 h-6" />
        <h2>Messenger</h2>
      </div>
      <div className="flex text-white flex-start w-3/4 text-lg font-head gap-8">
        <ImFilm className="w-6 h-6" />
        <h2>Watch</h2>
      </div>
      <div className="flex text-white flex-start w-3/4 text-lg font-head gap-8">
        <RiPagesLine className="w-6 h-6" />
        <h2>Pages</h2>
      </div>
      <div className="flex text-white flex-start w-3/4 text-lg font-head gap-8">
        <CgGames className="w-6 h-6" />
        <h2>Games</h2>
      </div>
      <div className="flex text-white flex-start w-3/4 text-lg font-head gap-8">
        <FaWpexplorer className="w-6 h-6" />
        <h2>Explore</h2>
      </div>
      <div className="flex text-white flex-start w-3/4 text-lg font-head gap-8">
        <BsCalendar2Event className="w-6 h-6" />
        <h2>Events</h2>
      </div>
      <div className="flex text-white flex-start w-3/4 text-lg font-head gap-8">
        <MdOutlineGroup className="w-6 h-6" />
        <h2>Groups</h2>
      </div>
      <div className="flex text-white flex-start w-3/4 text-lg font-head gap-8">
        <BsCollection className="w-6 h-6" />
        <h2>Collections</h2>
      </div>
    </>
  )
}

export default SideBarList