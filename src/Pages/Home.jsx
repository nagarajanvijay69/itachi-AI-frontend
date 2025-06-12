import React from 'react'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import { Link, NavLink} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Load from './Load'


const Home = () => {
    const [Loading, setLoading] = useState(true);

    const InitMessage = () =>{
      const messages = axios.get('https://itachi-idb9.onrender.com')
      messages.then((res) => {
        console.log(res.data);
        setLoading(false);
      }).catch((err) => {
        console.error("Error fetching initial message:", err);
      }); 
    }

    useEffect(() => {
      InitMessage();
    }, []);


  return (
    <>
      {Loading ? <Load /> : 
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
}
    </>
  )
}

export default Home