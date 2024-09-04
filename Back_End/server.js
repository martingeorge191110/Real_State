import express from "express";
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

/* Server Variable */
const server = express()
/* Variable holding whole environment variables */
dotenv.config()
const env = process.env

server.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
}))
server.use(express.urlencoded({
   extended: false
}))
server.use(morgan("tiny"))
server.use(express.json())



server.listen(env.PORT, () => {
   console.log(
      "Server listening to PORT: " + env.PORT
   )
})