// import User from '../Modules/User.js';
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

export {userInfo}
