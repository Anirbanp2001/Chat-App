import React from 'react'
import Chats from '../chats/Chats'
import Navbar from '../navbar/Navbar'
import Search from '../search/Search'
import './sidebar.scss'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar
