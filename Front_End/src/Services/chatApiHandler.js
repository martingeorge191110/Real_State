
/**
 * Api Call to get other users id from chat documents
 */

const getUsersIdFromChats = async (token) => {
   try {
      const response = await fetch("http://localhost:8000/api/chat/retrieve", {
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
         message: newErr.message,
         data: newErr.name
      })
   }
}

/**
 * Api Call to get user Chats
 */

const getOneChat = async (token, userId) => {
   try {
      const response = await fetch(`http://localhost:8000/api/chat/message/${userId}`, {
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
         message: newErr.message,
         data: newErr.name
      })
   }
}

/**
 * Api Call for Sending Messages
 */

const senMessApi = async (token, userId, type, message) => {
   try {
      const response = await fetch(`http://localhost:8000/api/chat/message/${userId}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
         },
         body: JSON.stringify({
            type: type,
            message: message
         })
      })

      const jsonObj = await response.json()
      return (jsonObj)
   } catch (err) {
      const newErr = new Error(err)
      return ({
         succes: false,
         message: newErr.message,
         data: newErr.name
      })
   }
}

export {getUsersIdFromChats, getOneChat, senMessApi}
