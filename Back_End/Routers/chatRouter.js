import express, { application } from 'express';
import { getMessages, sendMessage } from '../Controllers/chatController.js';
import verifyToken from '../Middlewares/tokenVerification.js';


const chatInfo = express.Router()

chatInfo.use(verifyToken)

/** 
 * This Router for send message should send the user Token at headers,
 * and the reciever id at params,
 * and the type (text or media) with message at body
 * 
 * if (useing getMessage for GET method) just we need user token and recieverId
 * */
   
chatInfo.route("/message/:recieverId")
                           .post(sendMessage)
                           .get(getMessages)

export default chatInfo
