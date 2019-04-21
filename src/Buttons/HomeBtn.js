import React from "react";
import { Link } from "react-router-dom";

const HomeBtn = () => {
    return (
        <Link className="link-tag" to="/"><svg className="svgFlip" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" /></svg>Home</Link>
    )
}

export default HomeBtn;