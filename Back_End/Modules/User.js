import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	},
	username: {
		type: String,
		required: true
	},
	useremail: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	national: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	createdTime: {
		type: Date,
		default: Date.now
	}
})

const User = mongoose.model("User", UserSchema)

export default User
