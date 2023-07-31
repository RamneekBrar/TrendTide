import React from "react";
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom"
import { initialState, reducer } from "./Reducers/userReducer"
import SignUp from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import App from "./App"
import Home from "./Pages/Home"
import Search from "./Pages/Search";
import Explore from "./Pages/Explore";
import Create from "./Pages/Create"
import Profile from "./Pages/Profile";
import UserProfile from "./Pages/UserProfile";


export const UserContext = React.createContext()

const Routing = () => {
  const navigate = useNavigate()
  const {state, dispatch} = React.useContext(UserContext)

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        if(user) {
            dispatch({type: "USER", payload: user})
            navigate("/")
        }
        else {
            navigate("/signup")
        }
    }, [])

  return (
    <Routes>
        <Route exact path="/signup" Component={SignUp}></Route>
        <Route exact path="/signin" Component={SignIn}></Route>
        <Route exact path="/" Component={App}>
            <Route exact path="" Component={Home}></Route>
            <Route exact path="search" Component={Search}></Route>
            <Route exact path="explore" Component={Explore}></Route>
            <Route exact path="create" Component={Create}></Route>
            <Route exact path="profile" Component={Profile}></Route>
            <Route exact path="profile/:userId" Component={UserProfile}></Route>
            {/* <Route exact path="myfollowingPosts" Component={FollowingPosts}></Route> */}
        </Route>
    </Routes>
  )
}


export default function FirstPage() {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={{state, dispatch}}>
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </UserContext.Provider>
    )
}