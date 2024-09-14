
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

export {userDataApi}
