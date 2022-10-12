import React from 'react'
import { useState } from 'react'
import './register.scss'
import Add from '../../images/add.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage,db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from 'react-router-dom';



export const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate=useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
       
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName );
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
            
          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });
      setloading(true);
    }
    catch (err) {
      setErr(true)
    }

  };
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Chat-App</span>
        <span className="title">Sign Up</span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter Name' />
          <input type='email' placeholder='Enter email' />
          <input type='password' placeholder='Enter password' />
          <input type='file' id='avatar' style={{ display: "none" }} />
          <label htmlFor='avatar'>
            <img src={Add} alt='' />
            <span>Add an Avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        {(!loading)&&err && <p>Sorry Something went wrong...</p>}
        <p>Already have an account?<Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
};
export default Register;