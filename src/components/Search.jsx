import { BsSearch, BsXLg } from "react-icons/bs";
import "./Search.scss"
import { useState } from "react";

function Search({ value, onChange }) {
    return (
        <div className="search-wrap" >
            <input
                value={value}
                type="search"
                placeholder="Search..."
                className="input-search"
                onChange={(e) => onChange(e.target.value)} />
            <button
                type="button"
                className="button-clear">
                <BsXLg className="icon-close" type="button" onClick={() => onChange("")} />
            </button>
            <span>
                <BsSearch className="icon-search" />
            </span>

        </div>
    )
}

export default Search;