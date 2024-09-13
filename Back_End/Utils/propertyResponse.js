
/**
 * Utility Function to response with message
 */

const newPostResp = (message, response) => {
   return (response.status(200).json({
      succes: true,
      message: message
   }))
} 

/**
 * Function to respose with the searching Requirements
 */

const resAllProperties = (respose, jsonArray) => {
   return (respose.status(200).json({
      succes: true,
      message: "Succesfuly Found!",
      data: jsonArray
   }))
}


export {newPostResp, resAllProperties}
