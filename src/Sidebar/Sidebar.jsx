import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Context } from '../Pages/Context';
import { deleteresPrompts, deleteuserPrompts} from '../Redux/Slice';
const Sidebar = () => {
  const [Toggle, setToggle] = useState(false);
  var userPrompts = useSelector((state) => state.prompt.userPrompts);
  var resPrompts = useSelector((state) => state.prompt.resPrompts);
  const dispatch = useDispatch();
  var SidebarPrompt;
  const { sendrequest } = useContext(Context);



  const handleDeleteChat = (value, index) => {
    setToggle(false);
    dispatch(deleteuserPrompts(index));
    dispatch(deleteresPrompts(index));
    SidebarPrompt = value;
    sendrequest(SidebarPrompt);
 };


  return (
    <div className={Toggle ? 'sidebar' : 'close-sidebar'}>
      <div className="toggle">
        <img src="./menu.svg" onClick={()=> setToggle(!Toggle)} className={Toggle ? 'hide-toggle' : 'show-toggle'}/>
        <img src="./close.svg" onClick={()=> setToggle(!Toggle)} className={Toggle ? 'show-toggle' : 'hide'}/>
      </div>
      <div className="info">
        <img src="itachi.jpg" />
        <div className="text-1"><b>Itachi AI</b></div>
      </div>
      <div className="recent">
        <div className="recent-heading"><b>Recent Chats</b></div>
        {userPrompts[0] ?
        <ul>
            {userPrompts.map((value, index) => (
               <li key={userPrompts.length - 1 - index} onClick={() => handleDeleteChat(value, index)}>{value}</li> 
            )).reverse()
            }
        </ul>
        : 
        <ul>
          <li>No Recent Data</li>
        </ul>
}
      </div>
      <Link className="contact" to='/log-in'><div className="contact">Log in</div></Link>
    </div>
  )
}

export default Sidebar