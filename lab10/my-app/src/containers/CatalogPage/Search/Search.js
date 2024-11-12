import React from "react";
import "./Search.css"

function Search({ onSearch, value }) {
    return(
        <div>
            <input type="text" placeholder="Search" className="search" onChange={onSearch} value={value}/>
        </div>
    );
}

export default Search;