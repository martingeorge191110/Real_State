
/**
 * Chat Controller response Function
 */

const chatResSuccessfuly = (res, message, statusCode, jsonObj, succ) => {
   return (
      res.status(statusCode).json({
         succes: succ,
         message: message,
         data: jsonObj
      })
   )
}

export {chatResSuccessfuly}
