import { getuserById, updateUser, userInfo } from "../Controllers/userController.js";
import verifyToken from "../Middlewares/tokenVerification.js";
import express from 'express'


const UserInfo = express.Router()

UserInfo.use(verifyToken)

/* Profile Operation */
UserInfo.route("/profile").get(userInfo).put(updateUser)

/* User Information */
UserInfo.route("/information/:usersId").get(getuserById)

export default UserInfo
