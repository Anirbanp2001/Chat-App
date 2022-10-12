import React,{useContext} from 'react'
import './navbar.scss'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../../context/AuthContext'


const Navbar = () => {
  const {currentUser}=useContext(AuthContext);
  return (
    <div className='navbar'>
        <span className='logo'>Chat-App</span>
        <div className="userInfo">
            <img src={currentUser.photoURL} alt=''/>
            <span className="userName">{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)} >Logout</button>
        </div>
      
    </div>
  )
};

export default Navbar