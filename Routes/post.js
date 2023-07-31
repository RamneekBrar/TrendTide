const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireLogin = require("../Middleware/requireLogin")
const Post = mongoose.model("Post")


router.get("/allpost", requireLogin, (req, res) => {
    Post.find()
    .populate("postedBy", "_id username image")
    .populate("comments.postedBy", "_id username")
    .sort("-createdAt")
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err);
    })
})


router.get("/followingpost", requireLogin, (req, res) => {
    Post.find({postedBy: {$in: req.user.following}})
    .populate("postedBy", "_id username image")
    .populate("comments.postedBy", "_id username")
    .sort("-createdAt")
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err);
    })
})


router.post("/createpost", requireLogin, (req, res) => {
    const {caption, imageUrl} = req.body
    if(!caption || !imageUrl) {
        return res.status(422).json({Error: "Please add all the fields"})
    }

    req.user.password = undefined
    const post = new Post({
        caption, 
        photo: imageUrl,
        postedBy: req.user
    })
    post.save().then(result => {
        res.json({post: result})
    })
    .catch(err => {
        console.log(err);
    })
})


router.get("/mypost", requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
    .populate("postedBy", "_id, username")
    .then(mypost => {
        res.json({mypost})
    })
    .catch(err => {
        console.log(err);
    })
})


router.put("/like", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.user._id}
    }, {
        new:true
    })
    .populate("postedBy", "_id username")
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        return res.status(422).json({Error: err})
    })
})


router.put("/unlike", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {likes: req.user._id}
    }, {
        new:true
    })
    .populate("postedBy", "_id username")
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        return res.status(422).json({Error: err})
    })
})


router.put("/comment", requireLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment}
    }, {
        new:true
    })
    .populate("comments.postedBy", "_id username")
    .populate("postedBy", "_id username")
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        return res.status(422).json({Error: err})
    })
})


router.delete("/deletepost/:postId", requireLogin, (req, res) => {
    Post.findOne({_id: req.params.postId})
    .populate("postedBy", "_id")
    .then(post => {
        if(!post) {
            return res.status(422).json({Error: "Post is not present"})
        }

        if(post.postedBy._id.toString() === req.user._id.toString()) {
            post.deleteOne()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
    .catch(err => {
        return res.status(422).json({Error: err})
    })
})

module.exports = router