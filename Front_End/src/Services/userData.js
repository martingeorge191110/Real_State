
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
 * Api Call to Update user Infomration
 */

const updateUserApi = async(e, token) => {
   e.preventDefault()

   try {

   } catch (err) {

   }
}

export {userDataApi, usersInfromation}
