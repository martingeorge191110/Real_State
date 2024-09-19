import React, { useEffect, useState } from 'react';
import './post.css';
import { FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import NavBar from '../../Components/Nav_Bar/navbar';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import Loading from '../../Components/Loading.js/loading';
import { onePostApi } from '../../Services/searchProperty';
import { useSelector } from 'react-redux';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import imgUrl1 from '../../Assets/marker-icon.png'
import { FaMessage } from 'react-icons/fa6';
import { userData } from '../../Data/searchData';
const Post = () => {
   /* Select token from the store */
   const token = useSelector(
      state => state.token
   )
   /* Params Variable to get Post Details */
   const param = useParams()
   /* Loading state */
   const [loading, setLoading] = useState(true)
   /* Response states and all data needed */
   const [apiData, setApiData] = useState(null)
   const [apiSucces, setApiSucces] = useState(false)
   const [apiMessage, setApiMessage] = useState(null)
   useEffect(() => {
      onePostApi(param.id, token).then(
         resObj => 
         {
            if (resObj.succes) {
               setApiData(resObj.data)
               setApiSucces(resObj.succes)
               setApiMessage(resObj.message)
               setLoading(false)
            } else {
               setApiData(null)
               setApiSucces(resObj.succes)
               setApiMessage(resObj.message)
               setLoading(false)
            }
         }
      )
   }, [])

   const position = [51.505, -0.09]
	const customIcon = new L.Icon({
		iconUrl:imgUrl1,
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

   const utilities = ["Electricity", "Water", "Internet"];

   return (
      <>
      <NavBar/>
      {
         loading ? <Loading color={"red"}/> :
         (
            apiSucces ? 
            <div className="real-estate-post">
       <div className="left-section">
         <div className="images-section">
            {
               apiData.post.images.map((img) => {
                  return (
                     <img src={img} alt="Property" className="main-image" />
                  )
               })
            }
           {/* Add more images if needed */}
         </div>
         <div className="title-section">
           <h1 className="post-title">{apiData.post.title}</h1>
           <div className="owner-info">
             <img src={userData.img} alt="Owner" className="owner-photo" />
             <span className="owner-name">John Doe</span>
           </div>
         </div>
         <p className="address"><FaMapMarkerAlt />{apiData.post.address}</p>
         <p className="price">${apiData.post.price}</p>
         <p className="description">
           {apiData.post.description}
         </p>
       </div>
       <div className="right-section">
         <div className="utilities-section">
           <h2>Utilities</h2>
           <ul>
             {utilities.map((utility, index) => (
               <li key={index}>{utility}</li>
             ))}
           </ul>
         </div>
         <div className="rooms-section">
           <h2>Rooms</h2>
           <ul>
               {
               Object.entries(apiData.post).map((arr, index) => {
                  if (arr[0] === 'bedRoom' || arr[0] === 'bathroom')
                     return (
                        <li key={index}>{arr[0]}: {arr[1]}</li>
                        )
               })
            }
           </ul>
         </div>
         <div className="nearby-places-section">
           <h2>Nearby Places</h2>
           <ul>
            {
               Object.entries(apiData.post).map((arr, index) => {
                  if (arr[0] === 'bus' || arr[0] === 'policeStation')
                     return (
                        <li key={index}>{arr[0]}: {arr[1]}</li>
                        )
               })
            }
           </ul>
         </div>
         <div className="map-section">
           <div className="map-placeholder">
           <MapContainer center={[apiData.post.latitude, apiData.post.longitude]} zoom={7} style={{height:"40vh" , width: "100%", borderRadius:"1rem"}}>
    		<TileLayer
      		url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      		attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
					<Marker position={[apiData.post.latitude, apiData.post.longitude]} icon={customIcon}>
               </Marker>
  		</MapContainer>
           </div>
         </div>
         <div className='actions-list'>
            <button className='save-action'>
               <FaHeart/>
               Save Post
            </button>
            <button className='mess-action'>
               <FaMessage/>
               Send Message
            </button>
         </div>
       </div>
     </div>
     : apiMessage
         )
      }
   
     </>
   );
 };


export default Post;
