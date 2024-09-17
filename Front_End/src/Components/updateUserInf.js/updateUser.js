import React, {useEffect, useState} from "react";
import './updateUser.css'


const UpdateProfile = ({setUpdateInfo}) => {
 
   const [file, setFile] = useState();
    function handleChange(e) {
      //   console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
      //   console.log(URL.createObjectURL(e.target.files[0]))
    }
   
    useEffect(() => {
      if (file)
         console.log(file)
    }, [file])
   return (
      <>
   <div className="update-form-overlay">
          <div className="update-form-container">
            <h2>Update Profile</h2>
            <form onSubmit={''}>
              <label>
                Name:
                <input type="text" name="name" defaultValue="John Doe" required />
              </label>
              <label>
                Photo:
                <input type="file" name="photo" onChange={handleChange}/>
                <img src={file} />
              </label>
              <div className="form-actions">
                <button onClick={(e) => {}} type="submit" className="save-button">Save</button>
                <button type="button" className="cancel-button" onClick={() => {setUpdateInfo(false)}}>Cancel</button>
              </div>
            </form>
            </div>
            </div>
      </>
   )
}

export default UpdateProfile
