import React, { useEffect, useState, useRef } from "react";
import Loading from "../Loading.js/loading.js";
import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { senMessApi } from "../../Services/chatApiHandler.js";
import { format } from "timeago.js";


const Chat = ({avatar, userName, messArray, userId}) => {
   /* Token for Authorization */
   const token = useSelector(
      state => state.token
   )

   /* State and Ction for handle scrolling Feature when the chat opened */
   const messagesEndRef = useRef(null);
   const scrollToBottom = () => {
      if (messagesEndRef.current) {
         messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
       }
   };

   /* State for change messages rendering */
   const [messConChange, setMessConChange] = useState({})
   /* State For message input */
   const [messInput, setMessInput] = useState("")
   useEffect(() => {
      if (messArray)
         setMessConChange(messArray)
   }, [messArray])

   useEffect(() => {
      scrollToBottom();
    }, [messConChange]);
   return (
      <>
         <div className="chat-section">
            <h2><img className="chat-img" src={avatar || "https://via.placeholder.com/50"}/>{userName}</h2>
            <div ref={messagesEndRef} className="chat-messages">
              
              { Array.isArray(messConChange[userId]) ?
                messConChange[userId].map((msg, index) => ( 
                <div key={index} className={`chat-message ${msg.senderId !== userId ? 'sent' : 'received'}`}>
                  <p>{msg.text}</p>
                  <span style={{fontSize: '10px'}}>{format(msg.time)}</span>
                </div>
              )): <Loading color={'red'}/>
              }
            </div>
            <div className="chat-input-section">
              <input onChange={(e) => setMessInput(e.currentTarget.value)} value={messInput} type="text" placeholder="Type your message..." className="chat-input" />
              <button onClick={ async () => {
               try {
                  const getMessage = await senMessApi(token, userId, "text", messInput)
                  setMessConChange(
                     {[userId]: [...messConChange[userId], getMessage.data]}
                  )
                  setMessInput("")
               } catch (err) {
                  console.log(err)
               }
              }} className="send-button"><FaPaperPlane /></button>
            </div>
          </div>
      </>
   )
}


export default Chat