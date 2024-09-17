import UserChat from "../Modules/userChat.js";
import { messTypeValidator } from "../Validators/stringValid.js";
import { chatResSuccessfuly } from "../Utils/chatResponse.js";


/**
 * Send Message Controller
 */
const sendMessage = async (req, res, next) => {
   const {_id} = req
   const recieverId = req.params.recieverId
   const { message, type } = req.body

   const messageValid = messTypeValidator(type, message)
   if (!messageValid.succes) {
      const newErr = new Error(messageValid.message)
      newErr.statusCode = 403
      return (next(newErr))
   }

   try {
      const userChat = await UserChat.findOne({
         participates: {
            $all: [_id, recieverId]
         }
      })
      const messType = (type === "text" ? "text" : "media")

      if (!userChat)
      {
         const userChatCreated = await UserChat.create({
            participates: [_id, recieverId],
            messages: [{
               senderId: _id,
               type: messType,
               text: messType === "text" ? message : undefined,
               media: messType === "media" ? message : undefined,
               seenBy: [_id]
            }]
         })
         const messageRes = userChatCreated.messages[userChatCreated.messages.length - 1]
         return chatResSuccessfuly(res, "Message Send Succesfuly", 200, messageRes, true)
      }

      const userChatUpdated = await UserChat.updateOne({
         participates: { $all: [_id, recieverId] }
      }, {
         $push: {
            messages: {
               senderId: _id,
               type: messType,
               text: messType === "text" ? message : undefined,
               media: messType === "media" ? message : undefined,
               seenBy: [_id]
            }
         }
      }, {
         runValidators: true
      })
      const lastMess = await UserChat.findOne({
            participates: {
               $all: [_id, recieverId]
            }
      })
   
      const messageRes = lastMess.messages[lastMess.messages.length - 1]
      return chatResSuccessfuly(res, "Message Send Succesfuly", 200, messageRes, true)
   } catch (err) {
      const newErr = new Error(err)
      return (next(newErr))
   }
}

/**
 * Get Messages Controller
 */

const getMessages = async (req, res, next) => {
   const {_id} = req
   const {recieverId} = req.params

   try {
      const chat = await UserChat.findOne({
         participates: {
            $all: [
               _id, recieverId
            ]
         }
      })
      console.log(chat.messages)
      if (!chat)
         return (chatResSuccessfuly(res, "Chat is not Exist", 404, null, false))

      return (chatResSuccessfuly(res, "Chat Succefuly Retrieved", 200, chat.messages, true))
   } catch (err) {
      const newErr = new Error(err)
      return (next(newErr))
   }
}

/**
 * Controller to get all of User Chats
 */

const retrieveUserChats = async (req, res, next) => {
   const {_id} = req

   try {
      const chats = await UserChat.find({
         participates: {
            $all: [_id]
         }
      }).select({'participates':{ $elemMatch: { $ne: _id } } })

      if (!chats)
         return (chatResSuccessfuly(res, "User Has not any Conversation", 404, null, true))
      
      return (
         chatResSuccessfuly(res, "User chats Retrieved, Succefuly!", 200, chats, true)
      )
   } catch (err) {
      const newErr = new Error(err)
      return (next(newErr))
   }
}
export {sendMessage, getMessages, retrieveUserChats}