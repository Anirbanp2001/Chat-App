import React, { useState,useContext } from 'react'
import './search.scss'
import { collection, query, where, getDocs,getDoc ,doc, setDoc,updateDoc, serverTimestamp} from "firebase/firestore";
import {AuthContext} from "../../context/AuthContext"
import {db} from "../../firebase"
import { ChatContext } from '../../context/ChatContext';
const Search = () => {
  const [userName, setuserName] = useState("");
  const [user, setuser] = useState(null);
  const [err, setErr] = useState(false);
  const {currentUser}=useContext(AuthContext);
  const {dispatch}=useContext(ChatContext)
  const handleSearch = async() => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setuser(doc.data());
      });

    } catch (err) {
      setErr(true);
    }

  }
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }
  const handleSelect=async()=>{
    const combinedId=user.uid>currentUser.uid?user.uid+currentUser.uid:currentUser.uid+user.uid;
    
    try{
      const res=await getDoc(doc(db,"chats",combinedId));
      if(!res.exists())
      {
        await setDoc(doc(db,"chats",combinedId),{messages:[]});
      }
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
      dispatch({state:"CHANGE_USER",payload:user})

    }catch(err){
      console.log(err);
    }
    setuser(null);
    setuserName("");
  }
  return (
    <div className='search'>
      <div className="userForm">
        <input type='text' className='inputText' placeholder='Find a user' onKeyDown={handleKey} onChange={(e) => setuserName(e.target.value)}  value={userName}/>
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
