import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../Navbar/Navbar'
import SidebarData from '../Sidebar/SidebarData'
import './Chat.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { adddatachat, addtempAI, addtempuser } from '../Redux/Slice'
import { Context } from './Context'
import { useNavigate } from 'react-router-dom';

const Chatdata = () => {
  const [Value, setValue] = useState('');
  const [Bool, setBool] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const tempuser = useSelector((state) => state.prompt.tempuser);
  const tempAI = useSelector((state) => state.prompt.tempAI);
  const User = useSelector((state) => state.prompt.currentUser);
  const [UserData, setUserData] = useState('');

  const showres = tempAI


  var PerfectRes = showres.split('**').map((item, index) => {
    const innerParts = item.split('*').map((subItem, subIndex) => {
      if (subIndex % 2 === 0) {
        return <span key={`sub-${index}-${subIndex}`}>{subItem}</span>;
      } else {
        return <span key={`sub-${index}-${subIndex}`}>{subItem} <br /></span>;
      }
    });

    if (index % 2 === 0) {
      return <span key={`main-${index}`}>{innerParts}</span>;
    } else {
      return (
        <span key={`main-${index}`}>
          <br /><b>{innerParts}</b><br />
        </span>
      );
    }
  });



  const sendrequest = async (Value, boolean) => {
    if (!Value.trim()) return;
    setBool(true);
    setLoading(true);

    dispatch(addtempuser(Value));
    dispatch(adddatachat(Value));


    const tempvalue = Value;
    setValue('');


    try {
      const response = await axios.post('https://itachi-ai-backend.onrender.com/message', {
        prompt: tempvalue
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const tempresponse = response.data.response;
      dispatch(addtempAI(tempresponse));

      setLoading(false);

      if(boolean == 1) return;

      try {
        const response = await axios.put('https://itachi-ai-backend.onrender.com/updatedata', {
          user: User,
          userPrompt: tempvalue
        })
        // console.log(response.data);

      } catch (error) {
        console.error("Error updating data:", error);

      }



    } catch (error) {
      console.error("Error sending request:", error);
    }


  }

  return (
    <>
      {User ?
        <div className='root'>
          <Navbar />
          <div className="chat">
            < Context.Provider value={{ sendrequest,}}>
              <SidebarData />
            </Context.Provider>
            <div className='chat-container'>
              <div className='one'>
                <div className={Bool ? "chats" : "hide-data"}>
                  <div className="chat-user">
                    <div className="text">{tempuser}</div>
                    <img src="./user.webp" />
                  </div>
                  <div className="chat-ai" >
                    <img src="./itachi.jpg" />
                    {loading ?
                      <div className="text-res loading">
                        <span>L</span>
                        <span>o</span>
                        <span>a</span>
                        <span>d</span>
                        <span>i</span>
                        <span>n</span>
                        <span>g</span>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </div>

                      : <div>
                        <div className="text-res">{
                          <span style={{ animationDelay: '0.3s' }}>{PerfectRes}</span>

                        }</div>
                      </div>
                    }
                  </div>
                </div>
                <img src="./itachi.jpg" className={Bool ? 'hide-data' : ''} />
                <div className={Bool ? "hide-data" : "title-1 title"}>Hey Bro !</div>
                <div className={Bool ? "hide-data" : "title-2 title"}><b>Iam Itachi Uchiha</b></div>
                <div className={Bool ? "hide-data" : "title-3 title"}>How can I help you ?</div>
              </div>
              <div className="two">
                <input type="text" placeholder='Enter your prompt....' onChange={(e) => setValue(e.target.value)} value={Value}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendrequest(Value,0);
                    }
                  }} />
                <img src="send.svg" onClick={() => sendrequest(Value)} />
              </div>

            </div>
          </div>

        </div>

        : <div></div>
      }
    </>
  )
}


export default Chatdata