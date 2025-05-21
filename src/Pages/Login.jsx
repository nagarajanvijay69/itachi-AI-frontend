import React, { useState } from 'react'
import './Login.css'
import Navbar from '../Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addcurrentUser } from '../Redux/Slice'

const Login = () => {

      const [Email, setEmail] = useState("")
      const [Password, setPassword] = useState("")
      const Navigate = useNavigate();
      var CurrentUser ; 
      var response;
      const dispatch = useDispatch();


      const userLogin = async () => {
        if(!Email || !Password) {
          window.alert("Please fill all the fields")
          return;
        }  
        const tempEmail = Email
        const tempPassword = Password
        

        try {
             response = await axios.post('https://itachi-idb9.onrender.com/login', {
              email: tempEmail,
              password: tempPassword
           })
            if(response.data.message === "User not found Please sign up") {
              window.alert("User not found Please sign up")
              Navigate('/sign-up');
              return;
            }

            if(response.data.message === "Incorrect password") {
              window.alert("Incorrect password")
              return;
            }

            setEmail("");
            setPassword("");

            if(response.data.message === "Login successful") {
                dispatch(addcurrentUser(response.data.detail));
              Navigate('/chat-with-login');

              return;
            }

            CurrentUser = response.data.detail;
            

        } catch (error) {
          console.error("Error during login:", error);
        }
      }

  return (<>
    <Navbar />
    <div className="login">
      <div className="form">
        <div className="heading"><b>Log In</b></div>
        <div className='table'>
          <div className='row'>
            <div>Email id </div>
            <input type="text" value={Email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <div className='row'>
            <div>Password </div>
            <input type="password" spellCheck value={Password} onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <button onClick={userLogin}>Log in</button>
        </div>
        <div className="signup">New user ?</div>
        <div className="signup">Sign In to Continue</div>
       <Link to='/sign-up'><button>Sign Up</button></Link> 
      </div>
      <Link to='/chat' className='link'><span className='link'>Go to Chat Page</span></Link>
    </div>
    </>
  )
}
export default Login