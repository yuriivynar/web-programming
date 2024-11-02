import React from "react";
import "./Search.css"

function Search({ onSearch }) {
    return(
        <div>
            <input type="text" placeholder="Search" className="search" onChange={onSearch}/>
        </div>
    );
}

export default Search;