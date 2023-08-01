import React, { useContext } from "react"
import { useParams } from "react-router-dom";
import { UserContext } from "../LandingPage";
import "../Pages-CSS/Profile.css"
import API_BASE_URL from "../api";


export default function UserProfile() {
    const [userProfile, setUserProfile] = React.useState(null);
    const {state, dispatch} = useContext(UserContext)
    const {userId} = useParams()

    React.useEffect(() => {
        fetch(`${API_BASE_URL}/user/${userId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(data => {
            setUserProfile(data);
        })
    }, [])


    function followUser() {
        fetch(`${API_BASE_URL}/follow`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userId
            })
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: "UPDATE", 
                payload: {
                    following: data.following,
                    followers: data.followers
                }
            })
            localStorage.setItem("user", JSON.stringify(data))
            setUserProfile(prevState => {
                return (
                    {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [
                                ...prevState.user.followers,
                                data._id
                            ]
                        }
                    }
                )
            })
        })
    }


    function unfollowUser() {
        fetch(`${API_BASE_URL}/unfollow`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                unfollowId: userId
            })
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: "UPDATE", 
                payload: {
                    following: data.following,
                    followers: data.followers
                }
            })
            localStorage.setItem("user", JSON.stringify(data))
            setUserProfile(prevState => {
                const newFollowers = prevState.user.followers.filter(item => item !== data._id)
                return (
                    {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollowers
                        }
                    }
                )
            })
        })
    }


    return (
        <>
        {userProfile ? 
            <div className="profile--page">
                <div className="profile">
                    <img src={userProfile.user.image} alt="Not available"></img>
                    <div className="profile--data">
                        <div className="profile--data--user">{userProfile.user.username}</div>
                        <div className="profile--data--acc">
                            <div>{userProfile.data.length} posts</div>
                            <div>{userProfile.user.followers.length} followers</div>
                            <div>{userProfile.user.following.length} following</div>
                        </div>
                        <button 
                            className="follow--button"
                            onClick={userProfile.user.followers.indexOf(state._id)===-1 ? followUser : unfollowUser}
                        >
                            {userProfile.user.followers.indexOf(state._id)===-1 ? "Follow" : "Un Follow"}
                        </button>
                    </div>
                </div>
                <hr></hr>
                
                <div className="profile--posts--grid">
                {
                    userProfile.data.map(post => {
                        return (
                            <div className="profile--post" key={post._id}>
                                <img className="profile--post--img" src={post.photo} alt="Not available" style={{width:"25vw"}}></img>
                            </div>
                        )
                    })
                }
                </div>
            </div> :
            <div>Loading....</div>
        }
        </>
    )
}