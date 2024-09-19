
/**
 * Function to get user Information in case of token Validation
 */

const userDataApi = async (token) => {
   try {
      const response = await fetch("http://localhost:8000/api/users/profile", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "authorization": `Baerer ${token}`
         }
      })

      const jsonObj = await response.json()
      return (jsonObj)
   } catch (err) {
      const newErr = new Error(err)
      return ({
         succes: false,
         message: newErr.message
      })
   }
}

const usersInfromation = async (token, arrayOfIds) => {
   /* 123,1233241,1231241 */
   const usersIds = arrayOfIds.join(",")
   try {
      const response = await fetch(`http://localhost:8000/api/users/information/${usersIds}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
         }
      })
      const jsonObj = await response.json()
      return (jsonObj)
   } catch (err) {
      const newErr = new Error(err)
      return ({
         succes: false,
         message: newErr.message
      })
   }
}

/**
 * Api Call to store user image in Cloud Server (Cloudinary)
 */

const storeImgApi = async (file) => {
   if (!file)
      return ({
         succes: false,
         message: "Please Choose Image"
         })

   const formData = new FormData();
   formData.append('file', file);
   formData.append('upload_preset', 'Real State');

   try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${'daghpnbz3'}/image/upload`, {
         method: 'POST',
         body: formData,
      });
      const data = await response.json()

      return ({
         succes: true,
         imgUrl: data.secure_url
      })
   } catch (err) {
      const newErr = new Error(err)
      return ({
         succes: false,
         message: newErr.message
      })
   }
}

/**
 * Api Call to Update user Infomration
 */

const updateUserApi = async(token, username, avatar) => {

   try {
      const response = await fetch("http://localhost:8000/api/users/profile", {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
         },
         body: JSON.stringify({
            username: username,
            avatar: avatar
         })
      })

      const jsonObj = await response.json()
      return (jsonObj)
   } catch (err) {
      const newErr = new Error(err)
      return ({
         succes: false,
         message: newErr.message
      })
   }
}

export {userDataApi, usersInfromation, storeImgApi, updateUserApi}
