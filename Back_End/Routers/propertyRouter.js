import express from 'express'
import verifyToken from '../Middlewares/tokenVerification.js'
import { newPost } from '../Controllers/propertyController.js'


const PropertyInf = express.Router()

PropertyInf.use(verifyToken)

PropertyInf.route("/new").post(newPost)

export default PropertyInf
