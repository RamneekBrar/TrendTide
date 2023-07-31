const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [{
        type: ObjectId,
        ref: "User"
    }],
    following: [{
        type: ObjectId,
        ref: "User"
    }],
    image: {
        type: String,
        default: "https://res.cloudinary.com/dcjfzm8ul/image/upload/v1688492867/User_ufkoen.png"
    }
})

mongoose.model("User",userSchema)