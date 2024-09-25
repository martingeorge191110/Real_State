import Property from "../Modules/property.js";
import User from "../Modules/User.js";
import { newPostResp, resAllProperties } from "../Utils/propertyResponse.js";
import {orgData, getPostInf} from "../Utils/propOrgData.js";
import { createError } from "../Validators/createError.js";

/**
 * Controller API to allow user creating new post
 */

const newPost = async (req, res, next) => {
	const userId = req._id;
	const userEmail = req.useremail;
 
	const {
	  title, price, images, bedRoom, bathroom, latitude,
	  longitude, city, address, bus, policeStation,
	  ambulance, description
	} = req.body;
 
	const docObj = {
	  title, 
	  price, 
	  images, 
	  bedRoom, 
	  bathroom, 
	  latitude,
	  longitude, 
	  city, 
	  address, 
	  bus, 
	  policeStation,
	  ambulance, 
	  description
	};
 
	try {

	  const findUser = await User.findOne({ _id: userId });
	  if (!findUser) {
		 return next(createError("User Not Found", 404));
	  }
 
	  let userProperty = await Property.findOne({ userId: userId });
 
	  	if (!userProperty) {
			userProperty = new Property({
				userId: userId,
				posts: [docObj]
		 	});
		await userProperty.save();
		return newPostResp("Successfully added your First Post, Congratulations!", res);
	  }
 
	  	await Property.updateOne(
			{ userId: userId },
		 	{ postsNumber: userProperty.postsNumber + 1 ,$push: { posts: docObj } },
		 	{ runValidators: true }
	  	);
 
	  	return newPostResp("Successfully added new Post, Congrats!", res);
 
	} catch (err) {
	  return next(createError("Something Went Wrong", 500));
	}
 };

/**
 * Controller to search about Property posts
 * query { city, min price, max price}
 */

const searchPosts = async (req, res, next) => {
	const { city, minPrice, maxPrice } = req.query
	try {
		const propertiesArr = await Property.find({
			posts: {
				$elemMatch: {
				  city: city,
				  price: { $lte: Number(maxPrice) }
				}
			}
		})

		if (!propertiesArr)
			return (next(createError("No Properties With desired Requirements", 404)))

		/* Organizing data function */
		const data = orgData(propertiesArr, minPrice, maxPrice)
		console.log(data)
		return (resAllProperties(res, data))
	} catch (err) {
		return (next(createError("Something Went Wrong")));
	}
}
 
/**
 * Controller for Searching about just one post
 */

const SearchOnePost = async (req, res, next) => {
	const { id } = req.params

	try {
		const findPost = await Property.findOne({
			"posts._id": id
		}).select("userId").select("posts")

		const result = await getPostInf(id, findPost.posts)
		return (resAllProperties(res, {
			userId: findPost.userId,
			post: result
		}))
	} catch (err) {
		const newErr = new Error(err)
		return (next(createError(newErr.message, 500)))
	}
}

/**
 * Api Call to get all user Posts
 */

const userPosts = async (req, res, next) => {
	const {_id} = req

	try {
		const userProperties = await Property.findOne({
			userId: _id
		})

		if (!userProperties) {
			const newError = new Error("No Posts Yet, Write Your First Post")
			newError.statusCode = 404
			return (next(newError))
		}

		return (resAllProperties(res, userProperties))
	} catch (err) {
		const newErr = new Error(err)
		return (next(newErr))
	}
}

export { newPost, searchPosts, SearchOnePost, userPosts};
 