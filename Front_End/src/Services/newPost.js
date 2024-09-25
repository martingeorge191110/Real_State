
/**
 * Api Call tosave the images and ge images urls
 */

const saveImgs = async (...images) => {

   let arr = []
   try {
      for (let i = 0; i < images.length; i++) {
         const formData = new FormData();
         formData.append('file', images[i]);
         formData.append('upload_preset', 'Real State');
         const response = await fetch(`https://api.cloudinary.com/v1_1/${'daghpnbz3'}/image/upload`, {
            method: "POST",
            body: formData
         })
         const data = await response.json()
         arr.push(data.secure_url);
      }

      return (arr)
   } catch (err) {
      console.error(err)
      return ([])
   }
}

/**
 * Api Call to save the Post with all nessecary Details
 */

const newPostApi = async (token, state, setLoading, history) => {
   setLoading(true)
   console.log("from state imgs", state.images)
   try {
      const imgResponse = await saveImgs(...state.images)
      // console.log(imgResponse)
      if (imgResponse.length < 1)
         return (null)

      state.images = imgResponse
      const response = await fetch("http://localhost:8000/api/property/post", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
         },
         body: JSON.stringify(state)
      })

      const jsonObj = await response.json()
      
      setLoading(false)
      window.alert(jsonObj.message)
      window.location.reload()
      return (jsonObj)
   } catch (err) {
      setLoading(false)
      const newErr = new Error(err)
      return ({
         succes: false,
         message: newErr.message,
         data: newErr.name
      })
   }
}

export default newPostApi