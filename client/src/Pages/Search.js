import React from "react"
import "../Pages-CSS/Search.css"
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [query, setQuery] = React.useState();
    const [list, setList] = React.useState([]);
    const navigate = useNavigate();

    function navigateToProfile(userId) {
        navigate("/profile/" + userId)
    }

    const listElements = list.map(item => {
        return (
            <div key={item} onClick={() => navigateToProfile(item._id)} className="search--list--item">{item.username}</div>
        )
    })


    function searchChange(e) {
        setQuery(e.target.value);
    }


    function clearQuery() {
        setQuery();
    }


    React.useEffect(() => {
        fetch("/search_users", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        })
        .then(res => res.json())
        .then(data => {
            setList(data);
        })

        if(!query)
        {
            setList([]);
        }
    }, [query])


    return (
        <div className="search--page">
            <div className="search">
                <div className="search--fields">
                    <input className="search--input" type="text" placeholder="Search..." value={query} onChange={searchChange}></input>
                    <button className="search--clear--button" onClick={clearQuery}>Clear</button>
                </div>
                <div className="search--list">{listElements}</div>
            </div>
        </div>
    )
}