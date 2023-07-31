import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Pages-CSS/Enter.css"

export default function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
        imageUrl: undefined
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


    function updateImage(e) {
        setUser(prevState => {
            return (
                {
                    ...prevState,
                    image: e.target.files[0]
                }
            )
        })
    }


    function uploadImage() {
        const data = new FormData();
        data.append("file", user.image);
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "dcjfzm8ul")
        fetch("https://api.cloudinary.com/v1_1/dcjfzm8ul/image/upload", {
            method: "post",
            body: data
        })
        .then(res => res.json())
        .then(data => {
            setUser(prevState => {
                return (
                    {
                        ...prevState,
                        imageUrl: data.url
                    }
                )
            })
        }) 
        .catch(err => {
            console.log(err);
        })
    }


    function uploadFields() {
        if(user.password !== user.confirmPassword)
        {
            console.log("Passwords do not match")
            return;
        }

        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user.username,
                email: user.email,
                password: user.password,
                image: user.imageUrl
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.Error) {
                console.log(data.Error)
            }
            else
            {
                console.log(data.Message)
                navigate("/signin")
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    
    function postUser(e) {
        e.preventDefault();

        if(user.image) {
            uploadImage()
        }
        else {
            uploadFields()
        }        
    }


    useEffect(() => {
        if(user.imageUrl) {
            uploadFields()
        }
    }, [user.imageUrl])

    return (
        <div className="page">
            <div className="page--form">
                <form>
                    <input 
                        className="input--username" 
                        type="text" 
                        placeholder="Username"
                        value={user.username}
                        onChange={updateChange}
                        name="username"
                    >
                    </input>
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
                    <input 
                        className="input--con--password" 
                        type="password" 
                        placeholder="Confirm Password"
                        value={user.confirmPassword}
                        onChange={updateChange}
                        name="confirmPassword"
                    >
                    </input>
                    <div  className="input--profile--pic">
                    <label for="input--profile--pic">Upload Profile Photo</label>
                    <input
                        id="input--profile--pic"
                        style={{display: "none"}}
                        type="file"
                        multiple accept="image/*"
                        onChange={updateImage}
                        name="image"
                    >
                    </input>
                    </div>
                    <button className="submit--button" onClick={postUser}>Sign Up</button>
                </form>
                <div>Already Have an account?
                    <NavLink style={{textDecoration: "none", color: "rgb(8,38,74)"}} to="/signin"> Log In</NavLink>
                </div>
            </div>
        </div>
    )
}