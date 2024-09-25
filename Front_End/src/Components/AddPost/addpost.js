import React, { useEffect, useState } from 'react';
import './addpost.css';
import { FaTimes } from 'react-icons/fa';
import { changeStateValues } from '../../Utilis/valueCahnge';
import newPostApi from '../../Services/newPost';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import MapForm from '../../Pages/MapPage/mapPage';
import Loading from '../Loading.js/loading';

const AddPost = ({ handleClose }) => {
  const history = useHistory()
  /* Token Selector */
  const token = useSelector(
    state => state.token
  )
  const [previewMainImage, setPreviewMainImage] = useState(null);
  const [previewOtherImages, setPreviewOtherImages] = useState([]);

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewMainImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  /* State to Appear location map */
  const [appearMap, setAppearMap] = useState(false)

  /* Make Action after change the main photo */
  useEffect(() => {
    if (previewMainImage) {
      setNewPost({...newPost, images: [previewMainImage, ...previewOtherImages]})
    }
  }, [previewMainImage])

  const handleOtherImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewOtherImages((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  };

  useEffect(() => {
    if (previewOtherImages) {
      setNewPost({
        ...newPost, images: [previewMainImage, ...previewOtherImages]
      })
    }
  }, [previewOtherImages])
  /* State To hold the new Post */
  const [newPost, setNewPost] = useState({
    title: null,
    price: null,
    images: [],
    bedRoom: 0,
    bathroom: 0,
    size: null,
    latitude: null,
    longitude: null,
    city: null,
    bus: '100m',
    policeStation: '100m',
    description: null
  })

  const [loading, setLoading] = useState(false)

  return (
    <div className="add-post-section-overlay">
      <div style={{top: appearMap ? "20rem": "-5rem"}} className="add-post-section-container">
        <div className="section-header">
          <h2>Add New Post</h2>
          <button className="close-button" onClick={() => handleClose(false)}><FaTimes /></button>
        </div>
        <form className="add-post-form">
          <label>
            Title:
            <input onChange={(e) => changeStateValues(e.currentTarget.value, newPost, "title", setNewPost)} type="text" name="title" required />
          </label>
          <label>
            Price:
            <input onChange={(e) => changeStateValues(Number(e.currentTarget.value), newPost, "price", setNewPost)} type="number" name="price" required />
          </label>
          <label className="image-upload-label">
            Main Photo:
            <input type="file" name="mainPhoto" accept="image/*" onChange={handleMainImageUpload} />
            {previewMainImage && (
              <div className="preview-image-container">
                <img src={previewMainImage} alt="Main Preview" className="preview-image" />
              </div>
            )}
          </label>
          <label className="image-upload-label">
            Other Photos:
            <input type="file" name="otherPhotos" accept="image/*" multiple onChange={handleOtherImagesUpload} />
            {previewOtherImages.length > 0 && (
              <div className="preview-images-container">
                {previewOtherImages.map((src, index) => (
                  <img key={index} src={src} alt={`Other Preview ${index}`} className="preview-image" />
                ))}
              </div>
            )}
          </label>
          <label>
            Number of Bedrooms:
            <input onChange={(e) => changeStateValues(Number(e.currentTarget.value), newPost, "bedRoom", setNewPost)}  type="number" name="bedrooms" required />
          </label>
          <label>
            Number of Bathrooms:
            <input onChange={(e) => changeStateValues(Number(e.currentTarget.value), newPost, "bathroom", setNewPost)} type="number" name="bathrooms" required />
          </label>
          <label>
            Size:
            <input onChange={(e) => changeStateValues(Number(e.currentTarget.value), newPost, "size", setNewPost)} type="number" name="bathrooms" required />
          </label>
          <label>
            <button onClick={() => {
              setAppearMap(!appearMap)
            }} className='location-btn'>Choose Your Map Location</button>
          </label>
          {
              appearMap ? 
              <MapForm newPost={newPost} setNewPost={setNewPost}/> : ""
          }
          <label>
            Address:
            <input onChange={(e) => changeStateValues((e.currentTarget.value), newPost, "address", setNewPost)} type="text" name="address" required />
          </label>
          <label>
            City:
            <input onChange={(e) => changeStateValues((e.currentTarget.value), newPost, "city", setNewPost)} type="text" name="city" required />
          </label>
          <label>
            Description:
            <input onChange={(e) => changeStateValues((e.currentTarget.value), newPost, "description", setNewPost)} name="description" rows="4" required/>
          </label>
          <label>
            Nearly Places:
            <input type="text" name="nearlyPlaces" placeholder="Bus station, police stations, ambulance" required />
          </label>
          <div className="form-actions">
            <button style={{pointerEvents: loading ? "none": ""}} onClick={(e) => {
              e.preventDefault()
              newPostApi(token, newPost, setLoading, history)
            }} type="submit" className="save-button">{loading ? <Loading/> : "Save"}</button>
            <button type="button" className="cancel-button" onClick={() => handleClose(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
