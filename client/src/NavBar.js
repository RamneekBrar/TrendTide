import React from "react";
import { GoHomeFill, GoHeart, GoHeartFill, GoSearch, GoBookmark, GoBookmarkFill } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./LandingPage";
import "./Navbar.css"

export default function Navbar() {
    const navigate = useNavigate();
    const {state, dispatch} = React.useContext(UserContext)

    function logOut() {
        localStorage.clear();
        dispatch({type: "CLEAR"})
        navigate("/signin");
    }

    return (
        <div className="navbar">
            <div className="navbar--title">Vibra</div>
            <div className="navbar--links">
                <NavLink style={{textDecoration: 'none', color: "black"}} to="">
                    <div className="navbar--links--cont">
                        <GoHomeFill /> 
                        <p>Home</p>
                    </div>
                </NavLink>
    
                <NavLink style={{textDecoration: 'none', color: "black"}} to="search">
                    <div className="navbar--links--cont">
                        <GoSearch />
                        <p>Search</p>
                    </div>
                </NavLink>
                
                <NavLink style={{textDecoration: 'none', color: "black"}} to="explore">
                    <div className="navbar--links--cont">
                        <MdOutlineExplore />
                        <p>Explore</p>
                    </div>
                </NavLink>
                
                <NavLink style={{textDecoration: 'none', color: "black"}} to="create">
                    <div className="navbar--links--cont">
                        <FiPlusSquare />
                        <p>Create</p>
                    </div>
                </NavLink>
                
                <NavLink style={{textDecoration: 'none', color: "black"}} to="profile">
                    <div className="navbar--links--cont">
                        {
                            state && <img src={state.image}></img>
                        }
                        <p>Profile</p>
                    </div>
                </NavLink>

                <button className="navbar--links--logout" onClick={logOut}>Log out</button>
            </div>
        </div>
    )
}

