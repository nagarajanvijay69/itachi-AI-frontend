import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import './Chat.css'
import axios from 'axios'
import { adduserPrompts, addresPrompts } from '../Redux/Slice'
import { useSelector, useDispatch } from 'react-redux'
import { Context } from './Context'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
// import "highlight.js/styles/";


const Chat = () => {
  const [Value, setValue] = useState('');
  const [Bool, setBool] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  var userPrompts = useSelector((state) => state.prompt.userPrompts);
  const showPrompt = userPrompts.length > 0 ? userPrompts[userPrompts.length - 1] : '';
  var resPrompts = useSelector((state) => state.prompt.resPrompts);
  const showres = resPrompts.length > 0 ? resPrompts[resPrompts.length - 1] : '';


  var PerfectRes = <ReactMarkdown
   rehypePlugins={[rehypeHighlight]}
   remarkPlugins={[remarkGfm]}
   >{showres}</ReactMarkdown>;
  // .split('**').map((item, index) => {
  //     const innerParts = item.split('*').map((subItem, subIndex) => {
  //         if (subIndex % 2 === 0) {
  //             return <span key={`sub-${index}-${subIndex}`}>{subItem}</span>;
  //         } else {
  //             return <span key={`sub-${index}-${subIndex}`}>{subItem} <br /></span>;
  //         }
  //     });

  //     if (index % 2 === 0) {
  //         return <span key={`main-${index}`}>{innerParts}</span>;
  //     } else {
  //         return (
  //             <span key={`main-${index}`}>
  //                 <br /><b>{innerParts}</b><br />
  //             </span>
  //         );
  //     }
  // });




  const sendrequest = async (Value) => {
    if (!Value.trim()) return;
    setBool(true);
    setLoading(true);

    const tempvalue = Value;
    dispatch(adduserPrompts(tempvalue));
    setValue('');


    try {
      const response = await axios.post('https://itachi-idb9.onrender.com/message', {
        prompt: tempvalue
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const tempresponse = response.data.response;

      dispatch(addresPrompts(tempresponse));


    } catch (error) {
      console.error("Error sending request:", error);
    }



    setLoading(false);

  }

  return (
    <div className='root'>
      <Navbar />
      <div className="chat">
        < Context.Provider value={{ sendrequest }}>
          <Sidebar />
        </Context.Provider>
        <div className='chat-container'>
          <div className='one'>
            <div className={Bool ? "chats" : "hide-data"}>
              <div className="chat-user">
                <div className="text">{showPrompt}</div>
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
                    <div className="text-res markdown">{
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
                  sendrequest(Value);
                }
              }} />
            <img src="send.svg" onClick={() => sendrequest(Value)} />
          </div>

        </div>
      </div>

    </div>
  )
}

export default Chat