import React from "react"
import { UserContext } from "../LandingPage";
import Post from "../Components/Post";
import "../Pages-CSS/Home.css"

export default function Explore() {
    const {state, dispatch} = React.useContext(UserContext);
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        fetch("/followingpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(data => {
            setPosts(data.posts)
        })
    }, [])


    function likePost(id) {
        fetch("/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        })
        .then(res => res.json())
        .then(data => {
            const newPosts = posts.map(post => {
                if(post._id === data._id) {
                    return data
                }
                else {
                    return post
                }
            })

            setPosts(newPosts)
        })
        .catch(err => {
            console.log(err);
        })
    }


    function unlikePost(id) {
        fetch("/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        })
        .then(res => res.json())
        .then(data => {
            const newPosts = posts.map(post => {
                if(post._id === data._id) {
                    return data
                }
                else {
                    return post
                }
            })

            setPosts(newPosts)
        })
        .catch(err => {
            console.log(err);
        })
    }


    function addComment(e, postId) {
        e.preventDefault();

        makeComment(e.target[0].value, postId)
    }


    function makeComment(text, postId) {
        fetch("/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text, 
                postId
            })
        })
        .then(res => res.json())
        .then(data => {
            const newPosts = posts.map(post => {
                if(post._id === data._id) {
                    return data
                }  
                else {
                    return post
                }
            })

            setPosts(newPosts)
        })
        .catch(err => {
            console.log(err);
        })
    }


    function deletePost(postId) {
        fetch(`/deletepost/${postId}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(data => {
            const newPosts = posts.filter(post => {
                return post._id !== data._id
            })

            setPosts(newPosts)
        })
    }


    const postElements = posts.map(post => {
        return (
            <Post 
                key={post._id}
                post={post}
                toggleLike={post.likes.indexOf(state._id)===-1 ? likePost : unlikePost}
                handleSubmit={addComment}
                handleDelete={deletePost}
            />
        )
    })

    return (
        <div className="explore">
            <div>
                {postElements}
            </div>
        </div>
    )
}