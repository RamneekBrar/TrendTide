import React from "react";
import { GoHeart, GoHeartFill, GoBookmark, GoBookmarkFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../LandingPage";
import "../Pages-CSS/Home.css"

export default function Post(props) {
    const {state, dispatch} = React.useContext(UserContext);
    const navigate = useNavigate();

    function openProfile() {
        if(state._id === props.post.postedBy._id)
        navigate("/profile")
        else
        navigate("/profile/" + props.post.postedBy._id)
    }

    return (
        <div className="post">
            <div className="post--title">
                <div className="post--user">
                    <div>
                        <img src={props.post.postedBy.image} className="post--user--photo"></img>
                    </div>
                    <div className="post--user--name" onClick={openProfile}>
                        {/* <NavLink style={{textDecoration: "none", color: "white"}} to={state._id === props.post.postedBy._id ? "profile" : "profile/" + props.post.postedBy._id}> */}
                            {props.post.postedBy.username}
                        {/* </NavLink> */}
                    </div>
                </div>
                <div>
                    {state._id === props.post.postedBy._id && 
                        <div onClick={() => props.handleDelete(props.post._id)}><MdDelete color="white" /></div>
                    }
                </div>
            </div>
            <div className="post--content">
                <img src={props.post.photo} alt="Not available"></img>
            </div>
            <div className="post--reactions">
                <div className="post--reaction--likes">{props.post.likes.length} likes</div>
                <div className="post--reaction--icons">
                    <div onClick={() => props.toggleLike(props.post._id)}>{props.post.likes.indexOf(state._id)===-1 ? <GoHeart /> : <GoHeartFill color="red" />}</div>
                </div>
            </div>
            <div className="post--caption">
                {props.post.caption}
            </div>
            {/* <div className="post--comments">
                {props.post.caption}
                {
                    props.post.comments.map(comment => {
                        return (
                            <>
                                <h6>{comment.postedBy.username}</h6>
                                <p>{comment.text}</p>
                            </>
                        )
                    })
                }
                <div className="post--comments--view">View all comments</div>
                <form onSubmit={(e) => props.handleSubmit(e, props.post._id)}>
                    <div className="post--comments--add"><input type="text" onChange={props.changeComment} value={props.comment} placeholder="Add a comment..."></input></div>
                </form>
            </div> */}
        </div>
    )
}