import { userInfo } from "../Controllers/userController.js";
import verifyToken from "../Middlewares/tokenVerification.js";
import express from 'express'


const UserInfo = express.Router()

UserInfo.use(verifyToken)

/* Profile Operation */
UserInfo.route("/profile").get(userInfo)

export default UserInfo
