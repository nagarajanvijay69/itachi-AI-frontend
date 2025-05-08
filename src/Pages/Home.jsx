import React from 'react'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { Link, NavLink} from 'react-router-dom'
import Login from './Login'


const Home = () => {

    const initreq = async ()=>{
        const response = await fetch('https://itachi-ai-backend.onrender.com/init', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // const data = await response.json();
        // console.log(data);
    }

  return (
     <div className="home">
        <Navbar />
        <div className="home-element">
          {/* <Sidebar /> */}
          <div className="info-bar">
            <div className="info-1">
            <img src="./itachi.jpg"  />
             <div className="title-1">Hey Bro!</div>
             <div className="title-2"><b>Iam Itachi Uchiha</b></div>
            </div>
            <div className="info-2">
            <div className="title"><b>Please Login To Continue</b></div>
             <Link to ='/log-in' className='btn'><button>Login</button></Link>
             <div className="title">Chat without Login</div>
             <Link to ='/chat' className='btn'><button>Click Me</button></Link>
            </div>
          </div>
        </div>
     </div>
  )
}

export default Home