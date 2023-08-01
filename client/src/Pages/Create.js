import React from "react"
import { useNavigate } from "react-router-dom";
import "../Pages-CSS/Create.css"
import API_BASE_URL from "../api";


export default function Create() {
    const navigate = useNavigate();

    const [create, setCreate] = React.useState({
        caption: "",
        image: "",
        imageUrl: ""
    })

    function updateCaption(e) {
        const {name, value} = e.target;

        setCreate(prevState => {
            return (
                {
                    ...prevState, 
                    [name]: value
                }
            )
        })
    }


    function updateImage(e) {
        setCreate(prevState => {
            return (
                {
                    ...prevState,
                    [e.target.name]: e.target.files[0]
                }
            )
        })
    }


    function postDetails(e) {
        e.preventDefault();

        const data = new FormData();
        data.append("file", create.image);
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "dcjfzm8ul")
        fetch("https://api.cloudinary.com/v1_1/dcjfzm8ul/image/upload", {
            method: "post",
            body: data
        })
        .then(res => res.json())
        .then(data => {
            setCreate(prevState => {
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


    React.useEffect(() => {
        if(create.imageUrl)
        {
            fetch(`${API_BASE_URL}/createpost`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body : JSON.stringify({
                    caption: create.caption,
                    imageUrl: create.imageUrl
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.Error) {
                    console.log(data.Error)
                }
                else
                {
                    navigate("/")
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [create.imageUrl])

    
    return (
        <div className="create--page">
            <form className="create--form">
                <input
                    className="caption--input"
                    type="text"
                    placeholder="Caption..."
                    onChange={updateCaption}
                    name="caption"
                    value={create.caption}
                ></input>
                <input
                    className="upload--post--pic"
                    type="file"
                    multiple accept="image/*"
                    onChange={updateImage}
                    name="image"
                ></input>
                <button className="create--post--button" onClick={postDetails}>Create Post</button>
            </form>
        </div>
    )
}