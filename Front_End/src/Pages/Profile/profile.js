import React, { useEffect, useState} from "react";
import NavBar from "../../Components/Nav_Bar/navbar";
import './profile.css'
import { FaMapMarkerAlt, FaBed, FaBath, FaHeart, FaCommentDots, FaPen, FaPlus, FaPaperPlane } from 'react-icons/fa';
// import { userData } from "../../Data/searchData";
import { useSelector } from "react-redux";
import { userDataApi, usersInfromation } from "../../Services/userData";
import { getOneChat, getUsersIdFromChats } from "../../Services/chatApiHandler";
import Loading from "../../Components/Loading.js/loading";
import Chat from "../../Components/Chat/chat";
import UpdateProfile from "../../Components/UpdateUserInf/updateUser";
import { userPostsApi } from "../../Services/searchProperty";
import AddPost from "../../Components/AddPost/addpost";

const Profile = () => {
   const [selectedChat, setSelectedChat] = useState(null);
  const chatsInformation = useSelector(
    state => state.chatInf
  )
  const [usersIds, setUsetIds] = useState()
  const token = useSelector(
    state => state.token
  )
  /* State for holding user information */
  const [users, setUsers] = useState(null)

  /* Call Page Apis to get other users information */
  const fetchApis = async () => {
    try {

      if (usersIds) {
        const userInfApi = await usersInfromation(token, usersIds)
        if (userInfApi.succes)
          setUsers(userInfApi.data)

      }
    } catch (err) {
      console.error(err)
    }
  }

  /* Create an array of users ids after rendering the page */
  /* Get user Posts */
  const [userPosts, setUserPosts] = useState(null)
  /* Gert user information from api call */
  const [mainUser, setMainUser] = useState(null)
  useEffect(() => {
    if (chatsInformation) {
      const chatsIds = chatsInformation.map((element) => {
        return element.participates[0]
      })
      setUsetIds(chatsIds)
    }
    if (token) {
      userDataApi(token).then(
        response => setMainUser(response.data)
      )
      userPostsApi(token).then(
        response => {
          // console.log(response.data.posts)
          setUserPosts(response)
        }
      )
    }
  }, [])

  /* Calling the api to get the users information */
  useEffect(() => {
    if (usersIds)
      fetchApis()
  }, [usersIds])

  /* State for loading */
  const [messContain, setMessContains] = useState({})
  const getUserChat = (token, userId) => {
    getOneChat(token,userId).then(
      chat => setMessContains({...messContain, 
        [`${userId}`]: [...chat.data]
      }))
  }

  /* Update user informationb settings */
  const [updateInf, setUpdateInf] = useState(false)

  /* New Post State */
  const [newPost, setNewPost] = useState(false)

   return (
      mainUser ?
        <>
        <NavBar />
         <div className="user-profile">
      <div className="left-section">
        <div className="user-info-section">
          <div className="section-title">
            <h2>User Information</h2>
            <button onClick={() => { setUpdateInf(!updateInf)}} className="update-button"><FaPen /> Update Profile</button>
          </div>
          <div className="user-details">
            <div className="user-photo-placeholder"><img src={mainUser.avatar || ""}></img></div>
            <p className="username">{mainUser.username}</p>
            <p className="user-email">{mainUser.useremail}</p>
          </div>
          {updateInf ? <UpdateProfile setUpdateInfo={setUpdateInf} mainUser={mainUser} setMainUser={setMainUser}/> : ""}
        </div>
        <div className="user-posts-section">
          <div className="section-title">
            <h2>My List</h2>
            <button onClick={ () => setNewPost(true)} className="add-button"><FaPlus/> Add New Post</button>
          </div>
          {newPost ? <AddPost handleClose={setNewPost}/> : ""}
          <div className="posts-list">
            {
              userPosts && userPosts.succes && Array.isArray(userPosts.data.posts) ? 
                userPosts.data.posts.map((property) => {
                  return (
                    <div key={property._id} className="search-result-item">
                     <img src={property.images[0]} alt="Property" className="result-img" />
                     <div className="result-details">
                       <h3 className="result-title">{property.title}</h3>
                        <p className="result-location"><FaMapMarkerAlt /> {property.address}</p>
                        <p className="result-price">${property.price}</p>
                        <div className="result-fet-act">
                          <div className="result-features">
                            <span><FaBed /> {property.bedRoom} </span>
                            <span><FaBath /> {property.bathroom}</span>
                          </div>
                          <div className="result-actions">
                            <FaHeart className="result-icon" />
                            <FaCommentDots className="result-icon" />
                          </div>
                        </div>
                      </div>
                    </div> 
                  )
                }):  ""
            }
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="messages-section">
          <h2>Past Messages</h2>
          {users ? users.map((user, index) =>  (
            <div key={index} className="message-item" onClick={() => {
              setSelectedChat({
                userId: user._id,
                userName: user.username,
                avatar: user.avatar
              })
              getUserChat(token, user._id)
            }
            }>
              <img src={user.avatar || 'https://via.placeholder.com/50'} alt="User" className="chat-user-photo" />
              <div className="message-details">
                <p className="chat-username">{user.username}</p>
                <p className="chat-preview">{user.useremail}</p>
              </div>
            </div>
          )) : ""}
        </div>
        {selectedChat !== null ? (
          <Chat avatar={selectedChat.avatar || ""} userName={selectedChat.userName} messArray={messContain} userId={selectedChat.userId}/>
        ) : ""}
      </div>
    </div>
  </> : <Loading color={'red'}/>
      
   )
}

export default Profile
