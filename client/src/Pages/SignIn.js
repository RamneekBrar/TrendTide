import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../LandingPage";
import "../Pages-CSS/Enter.css"

export default function SignIn() {
    const {state, dispatch} = React.useContext(UserContext)

    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });


    function updateChange(e) {
        const {name, value} = e.target
        setUser(prevState => {
            return (
                {
                    ...prevState,
                    [name]: value
                }
            )
        })
    }


    function postUser(e) {
        e.preventDefault();

        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.Error) {
                console.log(data.Error)
            }
            else
            {
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type: "USER", payload: data.user})
                navigate("/")
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    
    return (
        <div className="page">
            <div className="page--form">
                <form>
                    <input 
                        className="input--email" 
                        type="email" 
                        placeholder="Email"
                        value={user.email}
                        onChange={updateChange}
                        name="email"
                    >
                    </input>
                    <input 
                        className="input--password" 
                        type="password" 
                        placeholder="Password"
                        value={user.password}
                        onChange={updateChange}
                        name="password"
                    >
                    </input>
                    <button className="submit--button" onClick={postUser}>Sign In</button>
                </form>
                <div>Don't Have an account?
                    <NavLink style={{textDecoration: "none", color: "rgb(8,38,74)"}} to="/signup"> Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}