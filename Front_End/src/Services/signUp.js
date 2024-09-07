
/**
 * Function to call api for Signning Up
 */

const signUpApi = async (signUpDataObject, setSpinner) => {
   setSpinner(true)

   try {
      /* Call Sign Up Api for posting information */
      const response = await fetch("http://localhost:8000/api/auth/sign-up", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            ...signUpDataObject
         })
      })

      const resObj = await response.json()
      /* Check whether the response is OK or not */
      if (!response.ok)
         throw new Error(resObj.message || "Somthing went wrong, responsoe is not OK")

      return (resObj)
   } catch (err) {
      return ({
         succes: false,
         message: new Error(err).message
      })
   }
}

export default signUpApi