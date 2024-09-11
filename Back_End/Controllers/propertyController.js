import Property from "../Modules/property.js";
import User from "../Modules/User.js";
import { newPostResp, resAllProperties } from "../Utils/propertyResponse.js";
import orgData from "../Utils/propOrgData.js";
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
			"posts.city": city,
			"posts.price": { $gte: Number(minPrice), $lte: Number(maxPrice)}
		})

		if (!propertiesArr)
			return (next(createError("No Properties With desired Requirements", 404)))

		/* Organizing data function */
		const data = orgData(propertiesArr)
		return (resAllProperties(res, data))
	} catch (err) {
		return (next(createError("Something Went Wrong", 500)));
	}
}
 
export { newPost, searchPosts };
 