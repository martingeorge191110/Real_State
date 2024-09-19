import React, { useState, useRef, useEffect } from 'react';
import './updateUser.css';
import Loading from '../Loading.js/loading';
import { storeImgApi, updateUserApi } from '../../Services/userData';
import { useSelector } from 'react-redux';

const UpdateProfile = ({ setUpdateInfo, mainUser, setMainUser }) => {
  const token = useSelector(
    state => state.token
  )
  const [username, setusername] = useState(mainUser.username)

  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef(null);


  const [loading, setLoading] = useState(false)
  const clickSave = async () => {
    setLoading(true)
    try {

      const imgUrlResponse = await storeImgApi(file)
      // setFile(data.secure_url); // You can save this URL to your database or use it in your app
      /* Check if the user did not add image or somthing went wrong */
      console.log(imgUrlResponse)
      if (imgUrlResponse.succes === false) {
        setLoading(false)
        return (imgUrlResponse.message)
      }

      const UpdateProfile = await updateUserApi(token, username, imgUrlResponse.imgUrl)
      /* Check For Updating data Succesfuly */
      if (!UpdateProfile.succes){
        setLoading(false)
        return (UpdateProfile.message)
      }

      setMainUser(UpdateProfile.data)
      setLoading(false)
      setUpdateInfo(false)
      return (null)
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setFile(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    clickSave(); // Trigger the image upload when the form is submitted
  };

  return (
    <div className="update-form-overlay">
      <div className="update-form-container">
        <h2>Update Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          <label>
            Name:
            <input onChange={(e) => {setusername(e.currentTarget.value)}} type="text" name="name" value={username}  required className="input-field" />
          </label>
          <label className="image-upload-label">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="preview-image" />
            ) : (
              <div
                className={`drag-drop-area ${dragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <p>Drag & drop profile photo, or click to select</p>
              </div>
            )}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
              ref={fileInputRef}
            />
          </label>
          <div className="form-actions">
            <button type="submit" className="save-button" style={{pointerEvents: loading ? "none" : "visible", backgroundColor: loading ? "rgba(0, 115, 230, 0.1)": "#0073e6"}}>{loading ? <Loading/> : "Save"}</button>
            <button type="button" className="cancel-button" onClick={() => setUpdateInfo(false)}>Cancel</button>
          </div>
        </form>
        </div>
    </div>
  );
};

export default UpdateProfile;