import React from "react"
import { UserContext } from "../LandingPage";
import Post from "../Components/Post";
import "../Pages-CSS/Home.css"
import API_BASE_URL from "../api";

export default function Home() {
    const {state, dispatch} = React.useContext(UserContext);
    const [posts, setPosts] = React.useState([]);
    const [comment, setComment] = React.useState("");

    React.useEffect(() => {
        fetch(`${API_BASE_URL}/allpost`, {
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
        fetch(`${API_BASE_URL}/like`, {
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
        fetch(`${API_BASE_URL}/unlike`, {
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


    function changeComment(e) {
        setComment(e.target.value);
    }

    
    function addComment(e, postId) {
        e.preventDefault();

        makeComment(e.target[0].value, postId)

        setComment("");
    }


    function makeComment(text, postId) {
        fetch(`${API_BASE_URL}/comment`, {
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
        fetch(`${API_BASE_URL}/deletepost/${postId}`, {
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


    return (
        <div className="home">
            <div>
                {posts.length === 0 ? "Loading" : 
                    posts.map(post => {
                        return (
                            <Post 
                                key={post._id}
                                post={post}
                                toggleLike={post.likes.indexOf(state._id)===-1 ? likePost : unlikePost}
                                handleSubmit={addComment}
                                handleDelete={deletePost}
                                comment={comment}
                                changeComment={changeComment}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}