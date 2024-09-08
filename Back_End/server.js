import express from "express";
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import Auth from "./Routers/authRouter.js";
import HandleError from "./Middlewares/errorHandling.js";
import PropertyInf from "./Routers/propertyRouter.js";

/* Server Variable */
const server = express()
/* Variable holding whole environment variables */
dotenv.config()
const env = process.env

mongoose.connect(env.URI).then(() => {
	console.log("MongoDB is now connected!")
}).catch((error) => {
	console.error('Error connecting to MongoDB:', error);
})

/* Cors for connect with other ports */
server.use(cors(//{
	// origin: 'http://localhost:3000',
	// credentials: true
/*}*/))
/* for decoding */
server.use(express.urlencoded({
	extended: false
}))
server.use(morgan("tiny"))

/* To Allow sending Json Objects */
server.use(express.json())

/* Authintication Router */
server.use("/api/auth", Auth)

/* Post a new property middleware */
server.use("/api/property", PropertyInf)

/* Erro Handling MiddleWare */
server.use("*", HandleError);

server.listen(env.PORT, () => {
	console.log(
		"Server listening to PORT: " + env.PORT
	)
})
