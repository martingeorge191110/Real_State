import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	images: [String],
	bedRoom: {
		type: Number,
		required: true
	},
	bathroom: {
		type: Number,
		required: true
	},
	latitude: {
		type: Number,
		required: true
	},
	longitude: {
		type: Number,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	bus: {
		type: String,
	},
	policeStation: {
		type: String,
	},
	ambulance: {
		type: String,
	},
	description: {
		type: String,
		required: true
	}
})

const propertySchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		ref: "User"
	},
	postsNumber: {
		type: Number,
		default: 1
	},
	posts: [postSchema]
})

const Property = mongoose.model("Property", propertySchema)

export default Property
