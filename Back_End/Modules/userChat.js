import mongoose from "mongoose";

const MessSchm = mongoose.Schema({
   senderId: {
      type: String,
      required: true,
      ref: "User"
   },
   type: {
      type: String,
      required: true,
      enum: ['text', 'media']
   },
   text: {
      type: String,
      required: function () {return (this.type === 'text')}
   },
   media: {
      type: String,
      required: function () {return (this.type === 'media')}
   },
   time: {
      type: Date,
		default: Date.now
   },
   seenBy: [{
      type: String,
      ref: 'User'
   }]
})

const UserChatScm = mongoose.Schema({
   participates: [{
      type: String,
      required: true,
      ref: 'User'
   }],
   messages: [MessSchm]
},  { timestamps: true })

const UserChat = mongoose.model("Chat" ,UserChatScm)

export default UserChat
