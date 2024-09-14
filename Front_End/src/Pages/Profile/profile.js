import React, {useDebugValue, useState} from "react";
import NavBar from "../../Components/Nav_Bar/navbar";
import './profile.css'
import { FaMapMarkerAlt, FaBed, FaBath, FaHeart, FaCommentDots, FaPen, FaPlus, FaPaperPlane } from 'react-icons/fa';
import { userData } from "../../Data/searchData";

const Profile = () => {
   const [selectedChat, setSelectedChat] = useState(null);

   const userPosts = [
     {
       post: {
         _id: '1',
         images: ['https://via.placeholder.com/150'],
         title: 'Modern Apartment',
         address: '456 Elm St, City, Country',
         price: '250,000',
         bedroom: 2,
         bathroom: 2,
       },
     },
     {
       post: {
         _id: '2',
         images: ['https://via.placeholder.com/150'],
         title: 'Cozy Cottage',
         address: '789 Pine St, City, Country',
         price: '150,000',
         bedroom: 3,
         bathroom: 1,
       },
     },
   ];
 
   const messages = [
     {
       userPhoto: 'https://via.placeholder.com/50',
       username: 'Alice Smith',
       lastMessage: 'Hey, how are you?',
     },
     {
       userPhoto: 'https://via.placeholder.com/50',
       username: 'Bob Johnson',
       lastMessage: 'Can we schedule a viewing?',
     },
   ];
 
   const chatMessages = [
     { isUser: true, text: 'Hello!' },
     { isUser: false, text: 'Hi! How can I help you?' },
     { isUser: true, text: 'I am interested in the apartment.' },
     { isUser: false, text: 'Great! Let me know when you are available for a viewing.' },
   ];
 

   return (
      <>
         <NavBar/>
         <div className="user-profile">
      <div className="left-section">
        <div className="user-info-section">
          <div className="section-title">
            <h2>User Information</h2>
            <button className="update-button"><FaPen /> Update Profile</button>
          </div>
          <div className="user-details">
            <div className="user-photo-placeholder">[User Photo]</div>
            <p className="username">John Doe</p>
            <p className="user-email">john.doe@example.com</p>
          </div>
        </div>
        <div className="user-posts-section">
          <div className="section-title">
            <h2>My List</h2>
            <button className="add-button"><FaPlus /> Add New Post</button>
          </div>
          <div className="posts-list">
            {userPosts.map((property) => (
              <div key={property.post._id} className="search-result-item">
                <img src={property.post.images[0]} alt="Property" className="result-img" />
                <div className="result-details">
                  <h3 className="result-title">{property.post.title}</h3>
                  <p className="result-location"><FaMapMarkerAlt /> {property.post.address}</p>
                  <p className="result-price">${property.post.price}</p>
                  <div className="result-fet-act">
                    <div className="result-features">
                      <span><FaBed /> {property.post.bedroom}</span>
                      <span><FaBath /> {property.post.bathroom}</span>
                    </div>
                    <div className="result-actions">
                      <FaHeart className="result-icon" />
                      <FaCommentDots className="result-icon" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="messages-section">
          <h2>Past Messages</h2>
          {messages.map((message, index) => (
            <div key={index} className="message-item" onClick={() => setSelectedChat(index)}>
              <img src={message.userPhoto} alt="User" className="chat-user-photo" />
              <div className="message-details">
                <p className="chat-username">{message.username}</p>
                <p className="chat-preview">{message.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedChat !== null && (
          <div className="chat-section">
            <h2><img className="chat-img" src={userData.img}/>{messages[selectedChat].username}</h2>
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.isUser ? 'sent' : 'received'}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="chat-input-section">
              <input type="text" placeholder="Type your message..." className="chat-input" />
              <button className="send-button"><FaPaperPlane /></button>
            </div>
          </div>
        )}
      </div>
    </div>
      </>
   )
}

export default Profile
