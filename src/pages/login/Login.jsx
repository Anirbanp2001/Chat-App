import React,{useState} from 'react'
import './login.scss'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate ,Link} from 'react-router-dom';
export const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  
  const navigate=useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      setloading(true);
    } catch (err) {

      setError(true)
    }
  }
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Chat-App</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Enter email' />
          <input type='password' placeholder='Enter password' />
          <input type='file' id='avatar' style={{ display: "none" }} />
          <button>Login</button>
        </form>
        {(!loading)&&error && <p>Sorry Something went wrong...</p>}
        <p>Don't  have an account?<Link to="/register">Sign up</Link></p>
      </div>
    </div>
  )
};
export default Login;