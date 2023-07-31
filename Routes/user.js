const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireLogin = require("../Middleware/requireLogin")
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get("/user/:id", requireLogin, (req, res) => {
    User.findOne({_id: req.params.id})
    .select("-password")
    .then(user => {
        Post.find({postedBy: req.params.id})
        .populate("postedBy", "_id username")
        .then(data => {
            res.json({user, data})
        })
        .catch(err => {
            return res.status(422).json({Error: err})
        })
    })
    .catch(err => {
        return res.status(404).json({Error: "User not found"})
    })
})


router.put("/follow", requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: {followers: req.user._id}
    }, {
        new: true
    })
    .select("-password")
    .then(data => {
        User.findByIdAndUpdate(req.user._id, {
            $push: {following: req.body.followId}
        }, {
            new: true
        })
        .select("-password")
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            return res.status(422).json({Error: err})
        })
    })
    .catch(err => {
        return res.status(422).json({Error: err})
    })
})


router.put("/unfollow", requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: {followers: req.user._id}
    }, {
        new: true
    })
    .then(data => {
        User.findByIdAndUpdate(req.user._id, {
            $pull: {following: req.body.unfollowId}
        }, {
            new: true
        })
        .select("-password")
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            return res.status(422).json({Error: err})
        })
    })
    .catch(err => {
        return res.status(422).json({Error: err})
    })
})


router.post("/search_users", (req, res) => {
    if(req.body.query) {
        let userPattern = new RegExp(req.body.query + "+")
        User.find({username: {$regex: userPattern}})
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            console.log(err);
        })
    }
})

module.exports = router