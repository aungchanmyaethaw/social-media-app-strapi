import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { RiMessengerLine } from 'react-icons/ri'
import { ImFilm } from 'react-icons/im'
import { RiPagesLine } from 'react-icons/ri'
import { CgGames } from 'react-icons/cg'
import { FaWpexplorer } from 'react-icons/fa'
import { MdOutlineGroup } from 'react-icons/md'
import { BsCalendar2Event } from 'react-icons/bs'
import { BsCollection } from 'react-icons/bs'
import { slugify } from '../utils'

const itemsList = [
  {
    icon :  <FaHome className="w-6 h-6" />,
    name : "NewFeeds"
  },
  {
    icon :  <RiMessengerLine className="w-6 h-6"/>,
    name : "Messenger"
  },
  {
    icon : <ImFilm className="w-6 h-6"/> ,
    name : "Watch"
  },
  {
    icon : <RiPagesLine className="w-6 h-6"/> ,
    name : "Pages"
  },
  {
    icon : <CgGames className="w-6 h-6"/> ,
    name : "Games"
  },
  {
    icon : <FaWpexplorer className="w-6 h-6"/> ,
    name : "Explore"
  },
  {
    icon : <BsCalendar2Event className="w-6 h-6"/> ,
    name : "Events"
  },
  {
    icon : <MdOutlineGroup className="w-6 h-6"/> ,
    name : "Groups"
  },
  {
    icon : <BsCollection className="w-6 h-6"/> ,
    name : "Collections"
  },
]
  


const SideBarList = () => {
  return (
    <>  
      {itemsList.map( list => (
        <CustomLink to={slugify(list.name)} key={list.name}>
          {list.icon}
          <h2>{list.name}</h2>
        </CustomLink>       
    )) }
    </>
    
  )
}

function CustomLink({to, children}) {
  const location = useLocation();
  const splitPath = location.pathname.split('/');
  const isMatch = splitPath[splitPath.length - 1] === to;

   return (
      <Link 
    className={isMatch ? "flex text-primary flex-start w-3/4 text-lg font-head gap-10" 
    :
    "flex text-white flex-start w-3/4 text-lg font-head gap-10 hover:scale-95"   
    }
    to = {{
      pathname : to
    }}
    >
        {children}
      </Link>

   )

}

export default SideBarList