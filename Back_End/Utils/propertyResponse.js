
/**
 * Utility Function to response with message
 */

const newPostResp = (message, response) => {
   return (response.status(200).json({
      succes: true,
      message: message
   }))
} 

export {newPostResp}