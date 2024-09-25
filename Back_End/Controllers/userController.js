// import User from '../Modules/User.js';
import User from "../Modules/User.js"
import { findUser } from "../Utils/authHelper.js"

/**
 * Controller to Get Profile Information
 */

const userInfo = async (req, res, next) => {
	const {_id} = req
	try {
		const userInfo = await findUser(null, _id)

      if (userInfo.succes)
         return (res.status(200).json({
               ...userInfo
            }))
      
      return (res.status(403).json({
         ...userInfo
      }))
	} catch (err) {
		const newErr = new Error(err)
		return (next(newErr))
	}
}

/**
 * Controller to get user information with id not token
 */

const getuserById = async (req, res, next) => {
   const {usersId} = req.params

   const usersIdArr = usersId.split(",") || [usersId]

   try {
      const userInf = await User.find({
         _id: {
            $in: usersIdArr
         }
      }).select('-password -__v -createdTime')

      return (res.status(200).json({
         succes: true,
         message: "User Information Founded",
         data: userInf
      }))
   } catch (err) {
      const newErr = new Error(err)
		return (next(newErr))
   }
}

/**
 * Contoller To update user Infromation
 */

const updateUser = async (req, res, next) => {
   const {_id} = req
   const {username, avatar} = req.body

   if (!username || username === "" || username.length < 4)
   {
      const newErr = new Error("User Name is not Valid")
      newErr.statusCode = 400
      return (next(newErr))
   }
   try {
      const user = await User.updateOne({
         _id: _id
      }, {
         username: username,
         avatar: avatar
      }, {
         runValidators: true
      })
   
      if (!user) {
         const newErr = new Error("Failed to Update user data")
         newErr.statusCode = 403
         return (next(newErr))
      }
      const userInf = await User.findOne({
         _id: _id
      })
      return (res.status(200).json({
         succes: true,
         message: "Data has been Updated, Succesfuly!",
         data: userInf
      }))
   } catch (err) {
      const newErr = new Error(err)
		return (next(newErr))
   }
}

export {userInfo, getuserById, updateUser}
