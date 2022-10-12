import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';
import './message.scss'
import { Timestamp } from 'firebase/firestore';

const Message = ({message}) => {
  const {currentUser}=useContext(AuthContext);
  const {data}=useContext(ChatContext);
  const ref=useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behaviour:"smooth"});
  },[message])
  return (
    ((message.text.length>0)||(message.img))&& (<div className={`message ${message.senderId===currentUser.uid&&"owner"}`} ref={ref} >
      <div className="messageInfo">
      {((message.text.length>0)||(message.img))&&<img src={message.senderId===currentUser.uid?currentUser.photoURL:data.user.photoURL} alt='' />}
      {((message.text.length>0)||(message.img))&&<span>just now</span>}
      </div>
      <div className="messageContent"> 
      {(message.text.length>0) && <p>{message.text}</p>}
      {message.img && <img src={message.img} alt=''/>}
  </div>
    </div>)
  )
}

export default Message
