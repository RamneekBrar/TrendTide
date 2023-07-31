import React from "react"
import { UserContext } from "../LandingPage";
import "../Pages-CSS/Profile.css"

export default function Profile() {
    const [myPosts, setMyPosts] = React.useState([])
    const {state, dispatch} = React.useContext(UserContext);

    React.useEffect(() => {
        fetch("/mypost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(data => {
            setMyPosts(data.mypost);
        })
    }, [])


    const myPostElements = myPosts.map(post => {
        return (
            <div className="profile--post" key={post._id}>
                <img className="profile--post--img" src={post.photo} alt="Not available" style={{width:"25vw"}}></img>
            </div>
        )
    })


    return (
        <div>
            {state &&
                <div className="profile--page">
                    <div className="profile">
                        <div>
                            <img src={state.image} alt="Not available"></img>
                        </div>
                        <div className="profile--data">
                            <div className="profile--data--user">{state.username}</div>
                            <div className="profile--data--acc">
                                <div>{myPosts.length} posts</div>
                                <div>{state.followers.length} followers</div>
                                <div>{state.following.length} following</div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                
                    <div className="profile--posts--grid">
                        {myPostElements}
                    </div>
                </div>
            }
        </div>
    )
}