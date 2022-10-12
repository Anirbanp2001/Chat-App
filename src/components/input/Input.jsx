import React, { useState,useContext } from 'react'
import './input.scss'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';
import {v4 as uuid} from "uuid";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const {currentUser}=useContext(AuthContext);
  const {data}=useContext(ChatContext);
  const [text,setText]=useState("");
  const [img,setImg]=useState(null);
  const handleSelect=async()=>{
    if(img){
      const storageRef = ref(storage, uuid());

      const uploadTask =  uploadBytesResumable(storageRef, img);
     
      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );

    }else{
      (await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
        id:uuid(),
        text,
        date:Timestamp.now(),
        senderId:currentUser.uid
      })
      }))
    }
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp(),
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp(),
    })
    setText("");
    setImg(null);
  }
  return (
    <div className='input'>
      <input id='text' placeholder='Type Something' onChange={(e)=>setText(e.target.value)} value={text}/>
      
      <div className="send">
      <i className="fa-solid fa-paperclip"></i>
      <input type='file' id='file' style={{display:'none'}} onChange={(e)=>setImg(e.target.files[0])} />
      <label htmlFor='file'>
      <i className="fa-solid fa-image"/>
      </label>
      <button onClick={handleSelect}>Send</button>
      </div>
    </div>
  )
}

export default Input
