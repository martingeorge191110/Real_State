import express from 'express'
import verifyToken from '../Middlewares/tokenVerification.js'
import { newPost, SearchOnePost, searchPosts } from '../Controllers/propertyController.js'


const PropertyInf = express.Router()

PropertyInf.use(verifyToken)

/* Add New Property Post */
PropertyInf.route("/new").post(newPost)

/* Search about posts */
PropertyInf.route("/search").get(searchPosts)

/* Search for One Post */
PropertyInf.route("/post/:id").get(SearchOnePost)

export default PropertyInf
