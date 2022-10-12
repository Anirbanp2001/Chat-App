import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext';
import Input from '../input/Input';
import Messages from '../messages/Messages';
import './chat.scss'
const Chat = () => {
  const {data}=useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span className="chatName">{data.user?.displayName}</span>
        <div className="topIcon">
          <i className="fa-solid fa-phone"></i>
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat;
