import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import { useSelector, useStore } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Context } from '../Pages/Context';
import axios from 'axios';
import { addcurrentUser, adddatachat, deletedatachat, initdatachat } from '../Redux/Slice';
import { useNavigate } from 'react-router-dom';


const SidebarData = () => {
  const [Toggle, setToggle] = useState(false);
  var userPrompts = useSelector((state) => state.prompt.loginuserPrompts);
  var resPrompts = useSelector((state) => state.prompt.loginresPrompts);
  const dispatch = useDispatch();
  var [newtemp, Setnewtemp] = useState('');
  var SidebarPrompt = useSelector((state) => state.prompt.datachat);
  const navigate = useNavigate();
  const store = useStore();


  var allprompt;
  const User = useSelector((state) => state.prompt.currentUser);
  // console.log(User);
  const { sendrequest } = useContext(Context);

  // flushSync(()=>{
  //   Setnewtemp(SidebarPrompt);

  // })

  const sendreq = async (promptvalue) => {
    // console.log('sidebar', SidebarPrompt);
    // console.log('flush',newtemp);
    try {
      const res = await axios.put('https://itachi-idb9.onrender.com/update', {
        user: User,
        updatedChats: promptvalue
      }
      )
    } catch (e) {
      console.error(e.message);
    }
  }



  const fetch = async (allprompt) => {
    try {
      const userId = User._id;
      allprompt = await axios.post('https://itachi-idb9.onrender.com/getdata', {
        id: userId
      })
      // console.log('allPrompt : ',allprompt.data.userdata.userPrompt);
      dispatch(initdatachat(allprompt.data.userdata.userPrompt));
    }

    catch (e) {
      console.error(e.message);
    }
  }

  useEffect(() => {
    fetch(allprompt);

  }, []);


  const handleDeleteChat = (value, index) => {
    setToggle(false);
    dispatch(deletedatachat(index));
    const temp = value;
    sendrequest(temp, 1);
    const current = store.getState();
    const promptvalue = current.prompt.datachat;
    // console.log('value',promptvalue);

    sendreq(promptvalue);
  };

  const handlelogout = () => {
    dispatch(addcurrentUser(""));
    navigate('/');
  }


  return (
    <div className={Toggle ? 'sidebar' : 'close-sidebar'}>
      <div className="toggle">
        <img src="./menu.svg" onClick={() => setToggle(!Toggle)} className={Toggle ? 'hide-toggle' : 'show-toggle'} />
        <img src="./close.svg" onClick={() => setToggle(!Toggle)} className={Toggle ? 'show-toggle' : 'hide'} />
      </div>
      <div className="info">
        <img src="itachi.jpg" />
        <div className="text-1"><b>Itachi AI</b></div>
      </div>
      <div className="recent">
        <div className="recent-heading"><b>Recent Chats</b></div>
        {SidebarPrompt[0] ?
          <ul>
            {SidebarPrompt.map((value, index) => (
              <li key={SidebarPrompt.length - 1 - index}
                onClick={() => handleDeleteChat(value, index)}
              >{value}</li>
            )).reverse()
            }
          </ul>
          :
          <ul>
            <li>No Recent Data </li>
          </ul>
        }
      </div>
      <div className="contact datacontact" onClick={handlelogout}>Log Out</div>
    </div>
  )
}

export default SidebarData