import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import axios from 'axios'

const Signup = () => {
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const Navigate = useNavigate();

    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
    



    const loginData = async () => {
      const tempName = Name
      const tempEmail = Email
      const tempPassword = Password
      
    if(!isValidEmail(tempEmail)){
      window.alert("Email not valid");
      return;
    }


      if(!Name || !Email || !Password) {
          window.alert("Please fill all the fields")
          return;
      }

      setName("");
      setEmail("");
      setPassword("");

      
      try {
        const response = await axios.post('http://localhost:5000/signup', {
          name: tempName,
          email: tempEmail,
          password: tempPassword
      })
      console.log(response.data);

      if(response.data.message === "User already exists") {
        window.alert("User already exists")
      }

      if(response.data.message === "User created successfully") {
        window.alert("User created successfully Please Login to continue")
        Navigate('/log-in');
      }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }


  return (
     <>
     <Navbar />
     <div className="signup">
       <div className="form">
         <div className="heading"><b>Sign Up</b></div>
         <div className='table'>
           <div className='row'>
             <div>User Name </div>
             <input type="text"  value={Name} onChange={(e)=> setName(e.target.value)}/>
           </div>
           <div className='row'>
             <div>E-mail Id  </div>
             <input type="email" value={Email} onChange={(e)=> setEmail(e.target.value)}/>
           </div>
           <div className='row'>
             <div>Password </div>
             <input type="password" value={Password} onChange={(e)=> setPassword(e.target.value)}/>
           </div>
           <button onClick={loginData}>Sign up</button>
         </div>
         <div className="signup">Already Sign up ?</div>
        <Link to='/log-in'><button>Login</button></Link> 
       </div>
       <Link to='/chat' className='link'><span className='link'>Go to Chat Page</span></Link>
     </div>
     </>
  )
}

export default Signup