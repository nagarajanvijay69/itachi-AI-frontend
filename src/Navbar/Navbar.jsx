import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className="navbar">
       <Link to='/'  className='text'><div><b>Itachi AI</b></div></Link>
       <img src="./user.webp"/>
    </div>
  )
}

export default Navbar